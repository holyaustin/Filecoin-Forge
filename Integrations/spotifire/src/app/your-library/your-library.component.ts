import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AudioService, StreamState, StreamInfo } from '../services/audio.service';
import { BindDataGridItem, DataGridItem } from '../data-grid/data-grid.component';
import { WalletComponent } from '../wallet/wallet.component';
import { Album, Playlist, Song } from 'src/types/interfaces';
import { WalletService } from '../services/wallet.service';

declare var DatastoreService: any;

@Component({
    selector: 'app-your-library',
    templateUrl: './your-library.component.html',
    styleUrls: ['./your-library.component.scss']
})
export class YourLibraryComponent implements OnInit, AfterViewInit {
    @ViewChild('walletCompoment', { static: false }) walletCompoment: WalletComponent;
    songs: Array<DataGridItem> = new Array<DataGridItem>();
    playlists: Array<DataGridItem> = new Array<DataGridItem>();
    albums: Array<DataGridItem> = new Array<DataGridItem>();

    loading: boolean = false;
    state: StreamState;
    tab: string = 'songs';
    walletAddress: string = null;

    constructor(private _audioService: AudioService, private _walletService: WalletService) {}

    ngOnInit(): void {
        this.walletAddress = this._walletService.getAddress();

        if (this.walletAddress) {
            this.loadAlbums();
            this.loadSongs();
            this.loadPlaylists();
        }
    }

    ngAfterViewInit(): void {
        this._walletService.connection$.subscribe((isConnected: boolean) => {
            if (isConnected) {
                this.walletAddress = this._walletService.getAddress();
                this.loadAlbums();
                this.loadSongs();
                this.loadPlaylists();
            }
        });
    }

    playSong(song: any): void {
        let streamInfo: StreamInfo = { index: 0, songs: [song] };
        this._audioService.playStream(streamInfo).subscribe((events) => {});
    }

    playPlaylist(playlist: any): void {
        let streamInfo: StreamInfo = { index: 0, songs: playlist.songs };
        this._audioService.playStream(streamInfo).subscribe((events) => {});
    }

    connectWallet() {
        this.walletCompoment.openConnectDialog();
    }

    loadAlbums() {
        this.loading = true;
        var data = DatastoreService.getAlbums(null, this.walletAddress);
        data.forEach((item: Album) => {
            var dataItem = new BindDataGridItem(item, 'album');
            this.albums.push(dataItem);
        });
        this.loading = false;
    }

    loadSongs() {
        this.loading = true;
        var data = DatastoreService.getSongs(null, this.walletAddress);
        data.forEach((item: Song) => {
            var dataItem = new BindDataGridItem(item, 'song');
            this.songs.push(dataItem);
        });
        this.loading = false;
    }

    loadPlaylists() {
        this.loading = true;
        var data = DatastoreService.getPlaylists(this.walletAddress);
        data.forEach((item: Playlist) => {
            var dataItem = new BindDataGridItem(item, 'playlist');
            this.playlists.push(dataItem);
        });
        this.loading = false;
    }
}
