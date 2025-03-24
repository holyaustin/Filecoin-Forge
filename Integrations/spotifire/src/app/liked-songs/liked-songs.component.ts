import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Playlist, Song } from 'src/types/interfaces';
import { secondsToTime, timeToFromNow } from '../app.helper';
import { AudioService, StreamInfo } from '../services/audio.service';
import { DatastoreLoaderService } from '../services/datastore-loader.service';
import { WalletService } from '../services/wallet.service';

declare var DatastoreService: any;

@Component({
    selector: 'app-liked-songs',
    templateUrl: './liked-songs.component.html',
    styleUrls: ['./liked-songs.component.scss']
})
export class LikedSongsComponent implements OnInit {
    playlist: Playlist = {
        _id: 'liked-songs',
        name: 'Liked Songs',
        description: null,
        thumbnailUrl: '/assets/images/liked-songs.jpg',
        creator: this._walletService.getAddress(),
        songs: []
    };

    isPlaying: boolean = false;

    constructor(
        private _audioService: AudioService,
        private _walletService: WalletService,
        private _snackBar: MatSnackBar,
        private _datastoreLoaderService: DatastoreLoaderService
    ) {}

    ngOnInit() {
        this._datastoreLoaderService.load$.subscribe(() => {
            this.loadLikedSongs();
        });
        if (this._datastoreLoaderService.isLoaded) this.loadLikedSongs();

        this._audioService.getState().subscribe((state) => {
            if (!state.playing) {
                setTimeout(() => {
                    this.clearPlaying();
                });
            }
        });
    }

    private loadLikedSongs() {
        this.playlist.songs = [];
        var likedSongs: Array<Song> = DatastoreService.getLikedSongs(this._walletService.getAddress());
        this.playlist.songs = likedSongs;
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

    async removeLikeSong(likedSong) {
        likedSong.liked = false;
        var newLikedSongs = await DatastoreService.removeLikeSong(this._walletService.getAddress(), likedSong);
        localStorage.setItem('spotifire.likedSongs', JSON.stringify(newLikedSongs));
        this._snackBar.open(`Removed from your liked songs`, null, { duration: 1500, panelClass: ['snackbar-info'] });

        this.loadLikedSongs();
    }

    timeToFromNow(value) {
        return timeToFromNow(value);
    }
}
