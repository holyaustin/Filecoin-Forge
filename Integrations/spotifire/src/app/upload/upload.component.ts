import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Album, Artist, Song } from 'src/types/interfaces';
import { AppConstants } from '../app.constants';
import { FileHelper, generateId } from '../app.helper';
import { DialogService } from '../services/dialog.service';
import { Web3storageService } from '../services/web3storage.service';
import { WalletComponent } from '../wallet/wallet.component';
import * as id3 from 'id3js';
import { WalletService } from '../services/wallet.service';

declare var DatastoreService: any;

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, AfterViewInit {
    @ViewChild('walletCompoment', { static: false }) walletCompoment: WalletComponent;

    walletAddress: string = null;

    genres = AppConstants.Genres;

    album: any = {
        title: '',
        artist: '',
        genre: '',
        description: '',
        thumbnailFile: { src: '/assets/images/no-image.png', file: null },
        songs: []
    };

    fileHelper: FileHelper;

    constructor(
        private _fileHelper: FileHelper,
        private _web3StorageService: Web3storageService,
        private _snackBar: MatSnackBar,
        private _dialogService: DialogService,
        private _walletService: WalletService
    ) {
        this.fileHelper = _fileHelper;
    }

    ngOnInit(): void {
        this.walletAddress = this._walletService.getAddress();
    }

    ngAfterViewInit(): void {
        this._walletService.connection$.subscribe((isConnected: boolean) => {
            if (isConnected) {
                this.walletAddress = this._walletService.getAddress();
            }
        });
    }

    async onAddAudioFileChanged(event: Event) {
        const target = event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        if (!file) return;

        let addSong = {
            title: '',
            artist: '',
            genre: 'Unknown',
            duration: 0,
            audioFile: { src: null, file: file }
        };
        this.album.songs.push(addSong);

        setTimeout(() => {
            const audioElement = document.getElementById(`audio-${this.album.songs.length}`);
            this.fileHelper.readFileAsDataURL(file, (result) => {
                audioElement.setAttribute('src', result as string);
                addSong.audioFile.src = result as string;

                audioElement.onloadedmetadata = function () {
                    addSong.duration = (audioElement as any).duration;
                };
            });
        }, 100);

        id3.fromFile(file).then((tags) => {
            // tags now contains v1, v2 and merged tags
            console.log(tags);
            addSong.title = tags.title ? tags.title : '';
            addSong.artist = tags.artist ? tags.artist?.split(',').pop() : '';
            //addSong.duration = tags.duration;
        });
    }

    async upload() {
        const progressDialog = this._dialogService.startProgressDialog({
            progressMsg: 'The upload process would be taken a little time. Please wait...',
            doneMsg: 'Your album has been uploaded successfully!',
            isProcessed: false,
            showDoneButton: false
        });

        // TODO: validation
        console.log('upload album', this.album);

        // upload to web3storage
        const thumbCid = await this._web3StorageService.upload([this.album.thumbnailFile.file]);
        const thumbnailUrl = `https://${thumbCid}.ipfs.dweb.link/${this.album.thumbnailFile.file.name}`;
        console.log('thumbCid', thumbCid);
        console.log('thumb url', thumbnailUrl);

        // get artist
        var artists = await DatastoreService.getArtists(this.album.artist);
        let artist: Artist = {
            _id: generateId(),
            avatarUrl: '',
            created: Math.round(Date.now()),
            name: this.album.artist
        };
        if (artists.length == 0) {
            await DatastoreService.createArtist(artist);
        } else {
            artist = artists[0];
        }

        // add album to orbitdb
        let newAlbum: Album = {
            _id: generateId(),
            title: this.album.title,
            artist: artist,
            genre: this.album.genre.toLowerCase(),
            description: this.album.description,
            thumbnailUrl: thumbnailUrl,
            songs: new Array<Song>(),
            created: Math.round(Date.now()),
            creator: this.walletAddress
        };

        for (let i = 0; i < this.album.songs.length; i++) {
            let song = this.album.songs[i];
            let audioCid = await this._web3StorageService.upload([song.audioFile.file]);
            let audioUrl = `https://${audioCid}.ipfs.dweb.link/${song.audioFile.file.name}`;
            console.log('audioCid', audioCid);
            console.log('audio url', audioUrl);

            // add song to orbitdb
            let newSong: Song = {
                _id: generateId(),
                title: song.title,
                artist: artist,
                genre: this.album.genre.toLowerCase(),
                duration: song.duration,
                audioUrl: audioUrl,
                thumbnailUrl: thumbnailUrl,
                created: Math.round(Date.now()),
                creator: this.walletAddress
            };
            await DatastoreService.createSong(newSong);
            newAlbum.songs.push(newSong);
        }

        await DatastoreService.createAlbum(newAlbum);

        this._dialogService.closeProgressDialog(progressDialog);
    }

    connectWallet() {
        this.walletCompoment.openConnectDialog();
    }

    canUpload() {
        var isValid = this.album.title != '' && this.album.thumbnailFile.file != null && this.album.genre != '' && this.album.artist != '';
        this.album.songs.forEach((song) => {
            if (song.title === '' || song.artist === '')  isValid = false
        });
        return isValid;
    }
}
