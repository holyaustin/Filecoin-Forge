import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Album, Playlist, Song } from 'src/types/interfaces';
import { AudioService, StreamInfo } from '../services/audio.service';
import { EventsService } from '../services/events.service';
import { WalletService } from '../services/wallet.service';

declare var DatastoreService: any;

export interface DataGridItem {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    url: string;
    type: string;
    duration: string;
    owner: string;
    creator: string;
    created: number;
    dataSource?: Song | Album | Playlist;
}

export class BindDataGridItem implements DataGridItem {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    url: string;
    type: string;
    duration: string;
    owner: string;
    creator: string;
    created: number;
    dataSource?: Song | Album | Playlist;

    constructor(ds: Song | Album | Playlist, type: string) {
        this.dataSource = ds;
        this.type = type;
        if (this.type == 'song') this.bindSongData(this.dataSource as Song);
        if (this.type == 'album') this.bindAlbumData(this.dataSource as Album);
        if (this.type == 'playlist') this.bindPlaylistData(this.dataSource as Playlist);
    }

    private bindAlbumData(item: Album) {
        this.id = item._id;
        this.name = item.title;
        this.description = item.artist.name;
        this.thumbnail = item.thumbnailUrl;
        this.creator = item.creator;
        this.created = item.created;
        this.owner = item.creator;
    }

    private bindSongData(item: Song) {
        this.id = item._id;
        this.name = item.title;
        this.description = item.artist.name;
        this.thumbnail = item.thumbnailUrl;
        this.creator = item.creator;
        this.created = item.created;
        this.duration = item.duration.toString();
        this.url = item.audioUrl;
        this.owner = item.creator;
    }

    private bindPlaylistData(item: Playlist) {
        this.id = item._id;
        this.name = item.name;
        this.description = item.description;
        this.thumbnail = item.thumbnailUrl;
        this.creator = item.creator;
        this.created = item.created;
        this.owner = item.creator;
    }
}

@Component({
    selector: 'app-data-grid',
    templateUrl: './data-grid.component.html',
    styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {
    @Input() items: Array<DataGridItem>;

    selectedItem: DataGridItem;
    playlists: Array<any> = new Array<any>();

    constructor(
        private _audioService: AudioService,
        private _router: Router,
        private _snackBar: MatSnackBar,
        private _walletService: WalletService,
        private _eventsService: EventsService
    ) {}

    ngOnInit(): void {
        this._eventsService.playlistLoaded$.subscribe((rs) => {
            this.playlists = rs;
        })
        this.playlists = JSON.parse(localStorage.getItem('spotifire.playlists'));
    }

    shortAddress(address: string) {
        return `${address.substring(0, 8)}...${address.substring(address.length - 6)}`;
    }

    play(item: DataGridItem): void {
        if (item.type == 'song') {
            let song: Song = item.dataSource as Song;
            let streamInfo: StreamInfo = { index: 0, songs: [song] };
            this._audioService.playStream(streamInfo).subscribe((events) => {});
        } else if (item.type == 'album') {
            this._router.navigateByUrl(`/album/${item.id}`);
        } else if (item.type == 'playlist') {
            this._router.navigateByUrl(`/playlist/${item.id}`);
        }
    }

    async addToPlaylist(playlist) {
        const walletAddress = this._walletService.getAddress();
        if (walletAddress) {
            await DatastoreService.addToPlaylist(this.selectedItem.dataSource as Song, playlist.id, walletAddress);
            this._snackBar.open(`Added "${this.selectedItem.name}" to "${playlist.name}" successfully`, null, {
                duration: 3000,
                panelClass: ['snackbar-success']
            });
        }
    }

    selectItem(item: DataGridItem) {
        this.selectedItem = item;
    }
}
