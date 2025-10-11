const express = require("express");
const router = express.Router();

const {
  ListPlaylistsHandler,
} = require("../../handlers/views/accountHandler.view");

/*
  GET /me/playlists
  Render a list of the playlists from user
*/
router.get("/playlists", ListPlaylistsHandler);

module.exports = router;
