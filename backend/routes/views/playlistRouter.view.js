const express = require("express");
const router = express.Router();

const {
  CreatePlaylistHandler,
  GetPlaylistHandler,
  DeletePlaylistHandler,
} = require("../../handlers/views/playlistHandler.view");

/*
  POST /playlists
  Create a playlist
*/
router.post("/", CreatePlaylistHandler);

/*
  GET /playlists/:playlist_id
  Render playlist page 
*/
router.get("/:playlist_id", GetPlaylistHandler);

/*
  POST /playlists/delete
  Delete a playlist
*/
router.post("/delete", DeletePlaylistHandler);
/*
/*
  POST /playlists/:playlist_id/songs
  Add song to playlist

router.post("/:playlist_id/songs", AddSongToPlaylistHandler);

/*
  POST /playlists/:playlist_id/songs/remove
  Remove song from playlist

router.post("/:playlist_id/songs/remove", RemoveSongFromPlaylistHandler);*/
module.exports = router;
