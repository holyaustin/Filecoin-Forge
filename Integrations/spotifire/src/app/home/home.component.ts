import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BindDataGridItem, DataGridItem } from '../data-grid/data-grid.component';
import { DatastoreLoaderService } from '../services/datastore-loader.service';

declare var DatastoreService: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
    loading: boolean = false;
    songs: Array<DataGridItem> = new Array<DataGridItem>();
    playlists: Array<DataGridItem> = new Array<DataGridItem>();
    albums: Array<DataGridItem> = new Array<DataGridItem>();

    constructor(private _datastoreLoaderService: DatastoreLoaderService) {}

    async ngOnInit(): Promise<void> {
        this._datastoreLoaderService.load$.subscribe(() => {
            this.loadData();
        });
        if (this._datastoreLoaderService.isLoaded) this.loadData();
    }

    async ngAfterViewInit() {}

    loadData() {
        this.loading = true;

        // get songs
        let newSongs = DatastoreService.getNews('song');
        newSongs.forEach((item) => {
            var dataItem = new BindDataGridItem(item.object, 'song');
            this.songs.push(dataItem);
        });

        // get albums
        let newAlbums = DatastoreService.getNews('album');
        newAlbums.forEach((item) => {
            var dataItem = new BindDataGridItem(item.object, 'album');
            this.albums.push(dataItem);
        });

        // get playlists
        let newPlaylists = DatastoreService.getNews('playlist');
        newPlaylists.forEach((item) => {
            var dataItem = new BindDataGridItem(item.object, 'playlist');
            this.playlists.push(dataItem);
        });

        this.loading = false;
    }
}
