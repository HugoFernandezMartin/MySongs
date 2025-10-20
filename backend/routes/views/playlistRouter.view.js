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
module.exports = router;
