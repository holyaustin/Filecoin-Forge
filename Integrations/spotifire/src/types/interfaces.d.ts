declare var DatastoreService: any;

export interface Song {
    _id: string;
    title: string;
    artist: Artist;
    genre: string;
    duration: number;
    thumbnailUrl: string;
    audioUrl: string;
    created: number;
    creator: string;
    liked?: boolean;
    likedAt?: number;
    playing?: boolean;
}

export interface Album {
    _id: string;
    title: string;
    artist: Artist;
    description: string;
    genre: string;
    thumbnailUrl: string;
    songs: Array<Song>;
    created: number;
    creator: string;
}

export interface Artist {
    _id: string;
    name: string;
    avatarUrl: string;
    created: number;
}

export interface Playlist {
    _id: string;
    name: string;
    description: string;
    thumbnailUrl: string;
    created?: number;
    creator: string;
    songs?: Array<Song>
}

export interface PlaylistSong {
    _id: string;
    playlistId: string;
    song: Song;
    created: number;
    creator: string;
}