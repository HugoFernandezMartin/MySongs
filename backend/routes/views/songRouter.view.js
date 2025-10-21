const express = require("express");
const router = express.Router();

const {
  GetSongSearchHandler,
  CreateSongHandler,
  DeleteSongHandler,
} = require("../../handlers/views/songHandler.view");
const {
  adminAuthMiddlewareView,
  userAuthMiddlewareView,
} = require("../../commons/middlewares/authMiddleware");

/*
  GET /songs/search
  Render songSearch page 
*/
router.get("/search", userAuthMiddlewareView, GetSongSearchHandler);

/*
  POST /songs
  Create a new song
*/
router.post("/", adminAuthMiddlewareView, CreateSongHandler);

/*
  POST /songs/delete
  Delete song
*/
router.post("/delete", adminAuthMiddlewareView, DeleteSongHandler);

module.exports = router;
