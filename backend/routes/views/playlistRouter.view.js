const express = require("express");
const router = express.Router();

const {
  CreatePlaylistHandler,
  GetPlaylistHandler,
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

module.exports = router;
