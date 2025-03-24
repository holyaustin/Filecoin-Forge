import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AudioService, StreamInfo, StreamState } from '../services/audio.service';
import { WalletService } from '../services/wallet.service';

declare var DatastoreService: any;

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
    files: Array<any> = [];
    state: StreamState;
    currentFile: any = {};

    constructor(private audioService: AudioService, private _walletService: WalletService, private _snackBar: MatSnackBar) {
        // listen to stream state
        this.audioService.getState().subscribe((state) => {
            this.state = state;
        });
    }

    pause() {
        this.audioService.pause();
    }

    play() {
        this.audioService.play();
    }

    stop() {
        this.audioService.stop();
    }

    next() {
        this.audioService.next();
    }

    previous() {
        this.audioService.previous();
    }

    // isFirstPlaying() {
    //   return this.currentFile.index === 0;
    // }

    // isLastPlaying() {
    //   return this.currentFile.index === this.files.length - 1;
    // }

    onMediaSeed(change: any) {
        this.audioService.seekTo(change.value);
    }

    onVolumnChanged(change: any) {
        this.audioService.setVolumn(change.value / 100);
    }

    async addLikeSong() {
        var likedSong = this.state.streamInfo?.songs[this.state.streamInfo?.index];
        likedSong.liked = true;
        likedSong.likedAt = Math.round(Date.now());
        var newLikedSongs = await DatastoreService.addLikeSong(this._walletService.getAddress(), likedSong);
        localStorage.setItem('spotifire.likedSongs', JSON.stringify(newLikedSongs));
        this._snackBar.open(`Added to your liked songs`, null, { duration: 1500, panelClass: ['snackbar-info'] });
    }

    async removeLikeSong() {
        var likedSong = this.state.streamInfo?.songs[this.state.streamInfo?.index];
        likedSong.liked = false;
        var newLikedSongs = await DatastoreService.removeLikeSong(this._walletService.getAddress(), likedSong);
        localStorage.setItem('spotifire.likedSongs', JSON.stringify(newLikedSongs));
        this._snackBar.open(`Removed from your liked songs`, null, { duration: 1500, panelClass: ['snackbar-info'] });
    }
}
