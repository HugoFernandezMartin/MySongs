const express = require("express");
const router = express.Router();

const {
  CreatePlaylistHandler,
  GetPlaylistHandler,
} = require("../../handlers/views/playlistHandler.view");
const {
  userAuthMiddleware,
} = require("../../commons/middlewares/authMiddleware");

/*
  POST /playlists
  Create a playlist
*/
router.post("/", userAuthMiddleware, CreatePlaylistHandler);

/*
  GET /playlists/:playlist_id
  Render playlist page 
*/
router.get("/:playlist_id", GetPlaylistHandler);

module.exports = router;
