//Install express server
const express = require('express');
const path = require('path');

require('dotenv').config(__dirname + '/.env');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

// configs
app.get('/config', (req, res) => {
    res.json({
        ORBITDB_STORE_SONG: process.env.ORBITDB_STORE_SONG,
        ORBITDB_STORE_ALBUM: process.env.ORBITDB_STORE_ALBUM,
        ORBITDB_STORE_ARTIST: process.env.ORBITDB_STORE_ARTIST,
        ORBITDB_STORE_NEWS: process.env.ORBITDB_STORE_NEWS,
        ORBITDB_STORE_PLAYLIST: process.env.ORBITDB_STORE_PLAYLIST,
        ORBITDB_STORE_PLAYLIST_SONG: process.env.ORBITDB_STORE_PLAYLIST_SONG,
        ORBITDB_STORE_LIKED_SONG: process.env.ORBITDB_STORE_LIKED_SONG
    });
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
