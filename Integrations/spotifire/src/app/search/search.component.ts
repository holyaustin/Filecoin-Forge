import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from '../app.constants';
import { BindDataGridItem, DataGridItem } from '../data-grid/data-grid.component';

declare var DatastoreService: any;

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    loading: boolean = false;
    showResult: boolean = false;
    genres: any[] = new Array();

    searchTextValue: string = null;
    searchGenreValue: string = null;

    foundAlbums: Array<DataGridItem> = new Array<DataGridItem>();
    foundSongs: Array<DataGridItem> = new Array<DataGridItem>();
    foundPlaylists: Array<DataGridItem> = new Array<DataGridItem>();

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.searchTextValue = this.route.snapshot.queryParams.v;
            this.searchGenreValue = this.route.snapshot.queryParams.g;

            if (this.searchGenreValue) {
                this.searchByGenre();
            }
        });

        // get genres
        this.genres = AppConstants.Genres;
    }

    enterSearch(event) {
        this.searchGenreValue = null;
        this.searchTextValue = event.target.value;
        this.searchByText();
    }

    async searchByGenre() {
        this.loading = true;
        this.searchTextValue = null;
        this.foundAlbums = [];
        this.foundSongs = [];
        this.foundPlaylists = [];

        var albums = await DatastoreService.getAlbums(this.searchGenreValue.toLowerCase(), null);
        albums.forEach((item) => {
            var dataItem = new BindDataGridItem(item, 'album');
            this.foundAlbums.push(dataItem);
        });

        this.loading = false;
    }

    async searchByText() {
        this.loading = true;
        this.searchGenreValue = null;
        this.foundAlbums = [];
        this.foundSongs = [];
        this.foundPlaylists = [];

        var searchWords = this.searchTextValue.split(' ');

        // search album
        var albums = DatastoreService.searchAlbums(searchWords, searchWords);
        albums.forEach((item) => {
            var dataItem = new BindDataGridItem(item, 'album');
            this.foundAlbums.push(dataItem);
        });

        // search songs
        var songs = DatastoreService.searchSongs(searchWords, searchWords);
        songs.forEach((item) => {
            var dataItem = new BindDataGridItem(item, 'song');
            this.foundSongs.push(dataItem);
        });

        // search playlists
        var playlists = DatastoreService.searchPlaylists(searchWords);
        playlists.forEach((item) => {
            var dataItem = new BindDataGridItem(item, 'playlist');
            this.foundPlaylists.push(dataItem);
        });

        this.loading = false;
    }
}
