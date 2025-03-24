import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AudioService, StreamInfo } from '../services/audio.service';
import { Album, Playlist, Song } from 'src/types/interfaces';
import { secondsToTime, timeToFromNow } from '../app.helper';
import { DatastoreLoaderService } from '../services/datastore-loader.service';
import { WalletService } from '../services/wallet.service';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var DatastoreService: any;

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
    songs: any[];
    playlist: Playlist = {
        _id: '',
        name: '',
        description: '',
        thumbnailUrl: '/assets/images/no-image.png',
        creator: '',
        songs: []
    };

    id: string; // playlist/album id
    type: string; // Playlist | Album
    isPlaying: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private _audioService: AudioService,
        private _datastoreLoaderService: DatastoreLoaderService,
        private _walletService: WalletService,
        private _snackBar: MatSnackBar
    ) {}

    async ngOnInit(): Promise<void> {
        this.id = this.route.snapshot.paramMap.get('id');
        this.type = this.route.routeConfig.path.split('/')[0];

        this.route.params.subscribe(async (params) => {
            this.id = params.id;
            this._datastoreLoaderService.load$.subscribe(async () => {
                this.loadData();
            });
            if (this._datastoreLoaderService.isLoaded) this.loadData();
        });

        this._audioService.getState().subscribe((state) => {
            if (!state.playing) {
                setTimeout(() => {
                    this.clearPlaying();
                });
            }
        });
    }

    loadData() {
        if (this.type == 'playlist') {
            this.playlist = DatastoreService.getPlaylistById(this.id);

            // get songs
            var songs = DatastoreService.getPlaylistSongs(this.id);
            this.playlist.songs = songs;
        }

        if (this.type == 'album') {
            var album: Album = DatastoreService.getAlbumById(this.id);
            this.playlist = {
                _id: album._id,
                name: album.title,
                description: album.description,
                thumbnailUrl: album.thumbnailUrl,
                songs: album.songs,
                creator: album.creator
            };
        }

        // check liked songs
        var likedSongs: Array<Song> = DatastoreService.getLikedSongs(this._walletService.getAddress());
        this.playlist.songs.forEach((song) => {
            let isLiked = false;
            likedSongs.forEach((likedSong) => {
                if (likedSong._id == song._id) {
                    isLiked = true;
                }
            });
            song.liked = isLiked;
        });
    }

    playSong(song: any): void {
        let streamInfo: StreamInfo = { index: 0, songs: [song] };
        this._audioService.playStream(streamInfo).subscribe((events) => {
            this.setPlaying(song);
        });
    }

    playPlaylist(): void {
        let streamInfo: StreamInfo = { index: 0, songs: this.playlist.songs };
        this._audioService.playStream(streamInfo).subscribe((events) => {
            this.setPlaying(this.playlist.songs[0]);
        });
    }

    pause(): void {
        this._audioService.pause();

        setTimeout(() => {
            this.clearPlaying();
        });
    }

    setPlaying(song: Song) {
        this.clearPlaying();
        this.playlist.songs.forEach((s) => {
            if (s._id == song._id) s.playing = true;
        });
        this.isPlaying = true;
    }

    clearPlaying() {
        this.playlist.songs.forEach((song) => {
            song.playing = false;
        });
        this.isPlaying = false;
    }

    secondsToTime(val) {
        return secondsToTime(val);
    }

    totalDuration() {
        var totalDuration = this.secondsToTime(this.playlist.songs.reduce((sum, { duration }) => sum + duration, 0));
        return totalDuration;
    }

    timeToFromNow(value) {
        return timeToFromNow(value);
    }

    async removeLikeSong(likedSong) {
        likedSong.liked = false;
        var newLikedSongs = await DatastoreService.removeLikeSong(this._walletService.getAddress(), likedSong);
        localStorage.setItem('spotifire.likedSongs', JSON.stringify(newLikedSongs));
        this._snackBar.open(`Removed from your liked songs`, null, { duration: 1500, panelClass: ['snackbar-info'] });
    }

    async addLikeSong(likedSong) {
        likedSong.liked = true;
        likedSong.likedAt = Math.round(Date.now());
        var newLikedSongs = await DatastoreService.addLikeSong(this._walletService.getAddress(), likedSong);
        localStorage.setItem('spotifire.likedSongs', JSON.stringify(newLikedSongs));
        this._snackBar.open(`Added to your liked songs`, null, { duration: 1500, panelClass: ['snackbar-info'] });
    }
}
