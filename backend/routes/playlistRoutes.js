const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/Playlist.controller');

router.get('/playlists', playlistController.getPlaylists);
router.get('/playlists/:id', playlistController.getPlaylistById);
router.post('/playlists', playlistController.createPlaylist);
router.patch('/playlists/:id', playlistController.updatePlaylist);
router.delete('/playlists/:id', playlistController.deletePlaylist);

module.exports = router;