const express = require("express");
const router = express.Router();

const {
  GetSongSearchHandler,
} = require("../../handlers/views/songHandler.view");

/*
  POST /songs/search
  Render songSearch page 
*/
router.get("/search", GetSongSearchHandler);
module.exports = router;
