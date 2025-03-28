/*
 * The following code tries to reverse engineer the Amazon S3 APIs,
 * and is mostly copied from minio implementation.
 */

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Package cmd This file implements helper functions to validate Streaming AWS
// Signature Version '4' authorization header.
package iam

import (
	"bufio"
	"bytes"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"github.com/filedag-project/filedag-storage/objectservice/apierrors"
	"github.com/filedag-project/filedag-storage/objectservice/pkg/auth"
	"github.com/filedag-project/filedag-storage/objectservice/utils"
	"hash"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/dustin/go-humanize"
	"github.com/filedag-project/filedag-storage/objectservice/consts"
)

// Streaming AWS Signature Version '4' constants.
const (
	emptySHA256              = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
	streamingContentSHA256   = "STREAMING-AWS4-HMAC-SHA256-PAYLOAD"
	signV4ChunkedAlgorithm   = "AWS4-HMAC-SHA256-PAYLOAD"
	streamingContentEncoding = "aws-chunked"
)

// errSignatureMismatch means signature did not match.
var errSignatureMismatch = errors.New("Signature does not match")

// getChunkSignature - get chunk signature.
func getChunkSignature(cred auth.Credentials, seedSignature string, region string, date time.Time, hashedChunk string) string {
	// Calculate string to sign.
	stringToSign := signV4ChunkedAlgorithm + "\n" +
		date.Format(iso8601Format) + "\n" +
		getScope(date, region) + "\n" +
		seedSignature + "\n" +
		emptySHA256 + "\n" +
		hashedChunk

	// Get hmac signing key.
	signingKey := utils.GetSigningKey(cred.SecretKey, date, region, string(ServiceS3))

	// Calculate signature.
	newSignature := utils.GetSignature(signingKey, stringToSign)

	return newSignature
}

// CalculateSeedSignature - Calculate seed signature in accordance with
//     - http://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-streaming.html
// returns signature, error otherwise if the signature mismatches or any other
// error while parsing and validating.
func (s *AuthSys) CalculateSeedSignature(r *http.Request) (cred auth.Credentials, signature string, region string, date time.Time, errCode apierrors.ErrorCode) {
	// Copy request.
	req := *r

	// Save authorization header.
	v4Auth := req.Header.Get(consts.Authorization)

	// Parse signature version '4' header.
	signV4Values, errCode := parseSignV4(v4Auth, "", ServiceS3)
	if errCode != apierrors.ErrNone {
		return cred, "", "", time.Time{}, errCode
	}

	// Payload streaming.
	payload := streamingContentSHA256

	// Payload for STREAMING signature should be 'STREAMING-AWS4-HMAC-SHA256-PAYLOAD'
	if payload != req.Header.Get(consts.AmzContentSha256) {
		return cred, "", "", time.Time{}, apierrors.ErrContentSHA256Mismatch
	}

	// Extract all the signed headers along with its values.
	extractedSignedHeaders, errCode := extractSignedHeaders(signV4Values.SignedHeaders, r)
	if errCode != apierrors.ErrNone {
		return cred, "", "", time.Time{}, errCode
	}

	cred, _, errCode = s.checkKeyValid(r, signV4Values.Credential.accessKey)
	if errCode != apierrors.ErrNone {
		return cred, "", "", time.Time{}, errCode
	}

	// Verify if region is valid.
	region = signV4Values.Credential.scope.region

	// Extract date, if not present throw error.
	var dateStr string
	if dateStr = req.Header.Get("x-amz-date"); dateStr == "" {
		if dateStr = r.Header.Get("Date"); dateStr == "" {
			return cred, "", "", time.Time{}, apierrors.ErrMissingDateHeader
		}
	}

	// Parse date header.
	var err error
	date, err = time.Parse(iso8601Format, dateStr)
	if err != nil {
		return cred, "", "", time.Time{}, apierrors.ErrMalformedDate
	}

	// Query string.
	queryStr := req.Form.Encode()

	// Get canonical request.
	canonicalRequest := utils.GetCanonicalRequest(extractedSignedHeaders, payload, queryStr, req.URL.Path, req.Method)

	// Get string to sign from canonical request.
	stringToSign := utils.GetStringToSign(canonicalRequest, date, signV4Values.Credential.getScope())

	// Get hmac signing key.
	signingKey := utils.GetSigningKey(cred.SecretKey, signV4Values.Credential.scope.date, region, string(ServiceS3))

	// Calculate signature.
	newSignature := utils.GetSignature(signingKey, stringToSign)

	// Verify if signature match.
	if !compareSignatureV4(newSignature, signV4Values.Signature) {
		return cred, "", "", time.Time{}, apierrors.ErrSignatureDoesNotMatch
	}

	// Return caculated signature.
	return cred, newSignature, region, date, apierrors.ErrNone
}

const maxLineLength = 4 * humanize.KiByte // assumed <= bufio.defaultBufSize 4KiB

// lineTooLong is generated as chunk header is bigger than 4KiB.
var errLineTooLong = errors.New("header line too long")

// malformed encoding is generated when chunk header is wrongly formed.
var errMalformedEncoding = errors.New("malformed chunked encoding")

// chunk is considered too big if its bigger than > 16MiB.
var errChunkTooBig = errors.New("chunk too big: choose chunk size <= 16MiB")

// NewSignV4ChunkedReader returns a new s3ChunkedReader that translates the data read from r
// out of HTTP "chunked" format before returning it.
// The s3ChunkedReader returns io.EOF when the final 0-length chunk is read.
//
// NewChunkedReader is not needed by normal applications. The http package
// automatically decodes chunking when reading response bodies.
func NewSignV4ChunkedReader(req *http.Request, s *AuthSys) (io.ReadCloser, apierrors.ErrorCode) {
	cred, seedSignature, region, seedDate, errCode := s.CalculateSeedSignature(req)
	if errCode != apierrors.ErrNone {
		return nil, errCode
	}

	return &s3ChunkedReader{
		reader:            bufio.NewReader(req.Body),
		cred:              cred,
		seedSignature:     seedSignature,
		seedDate:          seedDate,
		region:            region,
		chunkSHA256Writer: sha256.New(),
		buffer:            make([]byte, 64*1024),
	}, apierrors.ErrNone
}

// Represents the overall state that is required for decoding a
// AWS Signature V4 chunked reader.
type s3ChunkedReader struct {
	reader        *bufio.Reader
	cred          auth.Credentials
	seedSignature string
	seedDate      time.Time
	region        string

	chunkSHA256Writer hash.Hash // Calculates sha256 of chunk data.
	buffer            []byte
	offset            int
	err               error
}

func (cr *s3ChunkedReader) Close() (err error) {
	return nil
}

// Now, we read one chunk from the underlying reader.
// A chunk has the following format:
//   <chunk-size-as-hex> + ";chunk-signature=" + <signature-as-hex> + "\r\n" + <payload> + "\r\n"
//
// First, we read the chunk size but fail if it is larger
// than 16 MiB. We must not accept arbitrary large chunks.
// One 16 MiB is a reasonable max limit.
//
// Then we read the signature and payload data. We compute the SHA256 checksum
// of the payload and verify that it matches the expected signature value.
//
// The last chunk is *always* 0-sized. So, we must only return io.EOF if we have encountered
// a chunk with a chunk size = 0. However, this chunk still has a signature and we must
// verify it.
const maxChunkSize = 16 << 20 // 16 MiB

// Read - implements `io.Reader`, which transparently decodes
// the incoming AWS Signature V4 streaming signature.
func (cr *s3ChunkedReader) Read(buf []byte) (n int, err error) {
	// First, if there is any unread data, copy it to the client
	// provided buffer.
	if cr.offset > 0 {
		n = copy(buf, cr.buffer[cr.offset:])
		if n == len(buf) {
			cr.offset += n
			return n, nil
		}
		cr.offset = 0
		buf = buf[n:]
	}

	var size int
	for {
		b, err := cr.reader.ReadByte()
		if err == io.EOF {
			err = io.ErrUnexpectedEOF
		}
		if err != nil {
			cr.err = err
			return n, cr.err
		}
		if b == ';' { // separating character
			break
		}

		// Manually deserialize the size since AWS specified
		// the chunk size to be of variable width. In particular,
		// a size of 16 is encoded as `10` while a size of 64 KB
		// is `10000`.
		switch {
		case b >= '0' && b <= '9':
			size = size<<4 | int(b-'0')
		case b >= 'a' && b <= 'f':
			size = size<<4 | int(b-('a'-10))
		case b >= 'A' && b <= 'F':
			size = size<<4 | int(b-('A'-10))
		default:
			cr.err = errMalformedEncoding
			return n, cr.err
		}
		if size > maxChunkSize {
			cr.err = errChunkTooBig
			return n, cr.err
		}
	}

	// Now, we read the signature of the following payload and expect:
	//   chunk-signature=" + <signature-as-hex> + "\r\n"
	//
	// The signature is 64 bytes long (hex-encoded SHA256 hash) and
	// starts with a 16 byte header: len("chunk-signature=") + 64 == 80.
	var signature [80]byte
	_, err = io.ReadFull(cr.reader, signature[:])
	if err == io.EOF {
		err = io.ErrUnexpectedEOF
	}
	if err != nil {
		cr.err = err
		return n, cr.err
	}
	if !bytes.HasPrefix(signature[:], []byte("chunk-signature=")) {
		cr.err = errMalformedEncoding
		return n, cr.err
	}
	b, err := cr.reader.ReadByte()
	if err == io.EOF {
		err = io.ErrUnexpectedEOF
	}
	if err != nil {
		cr.err = err
		return n, cr.err
	}
	if b != '\r' {
		cr.err = errMalformedEncoding
		return n, cr.err
	}
	b, err = cr.reader.ReadByte()
	if err == io.EOF {
		err = io.ErrUnexpectedEOF
	}
	if err != nil {
		cr.err = err
		return n, cr.err
	}
	if b != '\n' {
		cr.err = errMalformedEncoding
		return n, cr.err
	}

	if cap(cr.buffer) < size {
		cr.buffer = make([]byte, size)
	} else {
		cr.buffer = cr.buffer[:size]
	}

	// Now, we read the payload and compute its SHA-256 hash.
	_, err = io.ReadFull(cr.reader, cr.buffer)
	if err == io.EOF && size != 0 {
		err = io.ErrUnexpectedEOF
	}
	if err != nil && err != io.EOF {
		cr.err = err
		return n, cr.err
	}
	b, err = cr.reader.ReadByte()
	if b != '\r' {
		cr.err = errMalformedEncoding
		return n, cr.err
	}
	b, err = cr.reader.ReadByte()
	if err == io.EOF {
		err = io.ErrUnexpectedEOF
	}
	if err != nil {
		cr.err = err
		return n, cr.err
	}
	if b != '\n' {
		cr.err = errMalformedEncoding
		return n, cr.err
	}

	// Once we have read the entire chunk successfully, we verify
	// that the received signature matches our computed signature.
	cr.chunkSHA256Writer.Write(cr.buffer)
	newSignature := getChunkSignature(cr.cred, cr.seedSignature, cr.region, cr.seedDate, hex.EncodeToString(cr.chunkSHA256Writer.Sum(nil)))
	if !compareSignatureV4(string(signature[16:]), newSignature) {
		cr.err = errSignatureMismatch
		return n, cr.err
	}
	cr.seedSignature = newSignature
	cr.chunkSHA256Writer.Reset()

	// If the chunk size is zero we return io.EOF. As specified by AWS,
	// only the last chunk is zero-sized.
	if size == 0 {
		cr.err = io.EOF
		return n, cr.err
	}

	cr.offset = copy(buf, cr.buffer)
	n += cr.offset
	return n, err
}

// readCRLF - check if reader only has '\r\n' CRLF character.
// returns malformed encoding if it doesn't.
func readCRLF(reader io.Reader) error {
	buf := make([]byte, 2)
	_, err := io.ReadFull(reader, buf[:2])
	if err != nil {
		return err
	}
	if buf[0] != '\r' || buf[1] != '\n' {
		return errMalformedEncoding
	}
	return nil
}

// Read a line of bytes (up to \n) from b.
// Give up if the line exceeds maxLineLength.
// The returned bytes are owned by the bufio.Reader
// so they are only valid until the next bufio read.
func readChunkLine(b *bufio.Reader) ([]byte, []byte, error) {
	buf, err := b.ReadSlice('\n')
	if err != nil {
		// We always know when EOF is coming.
		// If the caller asked for a line, there should be a line.
		if err == io.EOF {
			err = io.ErrUnexpectedEOF
		} else if err == bufio.ErrBufferFull {
			err = errLineTooLong
		}
		return nil, nil, err
	}
	if len(buf) >= maxLineLength {
		return nil, nil, errLineTooLong
	}
	// Parse s3 specific chunk extension and fetch the values.
	hexChunkSize, hexChunkSignature := parseS3ChunkExtension(buf)
	return hexChunkSize, hexChunkSignature, nil
}

// trimTrailingWhitespace - trim trailing white space.
func trimTrailingWhitespace(b []byte) []byte {
	for len(b) > 0 && isASCIISpace(b[len(b)-1]) {
		b = b[:len(b)-1]
	}
	return b
}

// isASCIISpace - is ascii space?
func isASCIISpace(b byte) bool {
	return b == ' ' || b == '\t' || b == '\n' || b == '\r'
}

// Constant s3 chunk encoding signature.
const s3ChunkSignatureStr = ";chunk-signature="

// parses3ChunkExtension removes any s3 specific chunk-extension from buf.
// For example,
//     "10000;chunk-signature=..." => "10000", "chunk-signature=..."
func parseS3ChunkExtension(buf []byte) ([]byte, []byte) {
	buf = trimTrailingWhitespace(buf)
	semi := bytes.Index(buf, []byte(s3ChunkSignatureStr))
	// Chunk signature not found, return the whole buffer.
	if semi == -1 {
		return buf, nil
	}
	return buf[:semi], parseChunkSignature(buf[semi:])
}

// parseChunkSignature - parse chunk signature.
func parseChunkSignature(chunk []byte) []byte {
	chunkSplits := bytes.SplitN(chunk, []byte(s3ChunkSignatureStr), 2)
	return chunkSplits[1]
}

// parse hex to uint64.
func parseHexUint(v []byte) (n uint64, err error) {
	for i, b := range v {
		switch {
		case '0' <= b && b <= '9':
			b -= '0'
		case 'a' <= b && b <= 'f':
			b = b - 'a' + 10
		case 'A' <= b && b <= 'F':
			b = b - 'A' + 10
		default:
			return 0, errors.New("invalid byte in chunk length")
		}
		if i == 16 {
			return 0, errors.New("http chunk length too large")
		}
		n <<= 4
		n |= uint64(b)
	}
	return
}

// Trims away `aws-chunked` from the content-encoding header if present.
// Streaming signature clients can have custom content-encoding such as
// `aws-chunked,gzip` here we need to only save `gzip`.
// For more refer http://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-streaming.html
func TrimAwsChunkedContentEncoding(contentEnc string) (trimmedContentEnc string) {
	if contentEnc == "" {
		return contentEnc
	}
	var newEncs []string
	for _, enc := range strings.Split(contentEnc, ",") {
		if enc != streamingContentEncoding {
			newEncs = append(newEncs, enc)
		}
	}
	return strings.Join(newEncs, ",")
}
