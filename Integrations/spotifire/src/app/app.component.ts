import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BindDataGridItem, DataGridItem } from './data-grid/data-grid.component';
import { FileHelper, generateId } from './app.helper';
import { Web3storageService } from './services/web3storage.service';
import { WalletComponent } from './wallet/wallet.component';
import { Playlist } from 'src/types/interfaces';
import { WalletService } from './services/wallet.service';
import { DialogService } from './services/dialog.service';
import { DatastoreLoaderService } from './services/datastore-loader.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators';
import { EventsService } from './services/events.service';

declare var DatastoreService: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild('createPlaylistDialogRef') createPlaylistDialogRef: TemplateRef<any>;
    @ViewChild('walletCompoment', { static: false }) walletCompoment: WalletComponent;

    walletAddress: string = null;

    playlist: any = {
        name: '',
        description: '',
        thumbnailFile: { src: '/assets/images/no-image.png', file: null }
    };
    playlists: Array<Playlist> = new Array<Playlist>();

    fileHelper: FileHelper;

    constructor(
        private _httpClient: HttpClient,
        private _fileHelper: FileHelper,
        private _dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _web3StorageService: Web3storageService,
        private _walletService: WalletService,
        private _datastoreLoaderService: DatastoreLoaderService,
        private _eventsService: EventsService
    ) {
        this.fileHelper = _fileHelper;
    }

    async ngOnInit() {
        this._httpClient
            .get(window.location.origin + '/config')
            .pipe(
                finalize(async () => {
                    const config = JSON.parse(sessionStorage.getItem('spotifire.config'));
                    await this._datastoreLoaderService.load(config);

                    this.walletAddress = this._walletService.getAddress();
                    localStorage.removeItem('spotifire.playlists');
                    localStorage.removeItem('spotifire.likedSongs');
                    await this.loadPlaylists();
                    this.loadLikedSongs();
                })
            )
            .subscribe(
                (res) => {
                    console.log('load config from node env', res);
                    sessionStorage.setItem('spotifire.config', JSON.stringify(res));
                },
                (error) => {
                    console.log('load config from angular env', environment);
                    sessionStorage.setItem('spotifire.config', JSON.stringify(environment));
                }
            );
    }

    ngAfterViewInit(): void {
        this._walletService.connection$.subscribe(async (isConnected: boolean) => {
            if (isConnected) {
                this.walletAddress = this._walletService.getAddress();
                await this.loadPlaylists();
                this.loadLikedSongs();
            }
        });
    }

    openCreatePlaylistDialog() {
        if (!this.walletAddress) return;

        this.playlist = {
            name: '',
            description: '',
            thumbnailFile: { src: '/assets/images/no-image.png', file: null }
        };
        this._dialog.open(this.createPlaylistDialogRef, {
            width: '35rem'
        });
    }

    async savePlaylist() {
        const thumbCid = await this._web3StorageService.upload([this.playlist.thumbnailFile.file]);
        const thumbnailUrl = `https://${thumbCid}.ipfs.dweb.link/${this.playlist.thumbnailFile.file.name}`;
        console.log('thumbCid', thumbCid);
        console.log('thumb url', thumbnailUrl);

        var newPlaylist: Playlist = {
            _id: generateId(),
            name: this.playlist.name,
            description: this.playlist.description,
            thumbnailUrl: thumbnailUrl,
            created: Math.round(Date.now()),
            creator: this.walletAddress
        };

        await DatastoreService.createPlaylist(newPlaylist);

        this._snackBar.open(`Playlist has been created`, null, { duration: 3000, panelClass: ['snackbar-success'] });
        await this.loadPlaylists();
    }

    async loadPlaylists() {
        this.playlists = [];
        var myPlaylists = DatastoreService.getPlaylists(this.walletAddress);
        myPlaylists.forEach((item) => {
            this.playlists.push(item);
        });
        localStorage.setItem('spotifire.playlists', JSON.stringify(this.playlists));
        this._eventsService.playlistLoaded$.next(this.playlists);
    }

    loadLikedSongs() {
        var myLikedSongs = DatastoreService.getLikedSongs(this.walletAddress);
        localStorage.setItem('spotifire.likedSongs', JSON.stringify(myLikedSongs));
    }
}
