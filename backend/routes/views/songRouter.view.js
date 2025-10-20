const express = require("express");
const router = express.Router();

const {
  GetSongSearchHandler,
  CreateSongHandler,
  DeleteSongHandler,
} = require("../../handlers/views/songHandler.view");

/*
  GET /songs/search
  Render songSearch page 
*/
router.get("/search", GetSongSearchHandler);

/*
  POST /songs
  Create a new song
*/
router.post("/", CreateSongHandler);

/*
  POST /songs/delete
  Delete song
*/
router.post("/delete", DeleteSongHandler);

module.exports = router;
