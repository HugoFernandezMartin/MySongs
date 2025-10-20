const express = require("express");
const router = express.Router();

const {
  GetGenreHandler,
  CreateGenreHandler,
  DeleteGenreHandler,
} = require("../../handlers/views/genderHandler.view");
const {
  adminAuthMiddlewareView,
} = require("../../commons/middlewares/authMiddleware");

/*
  GET /genres/:genre_id
  Render genre page 
*/
router.get("/:genre_id", GetGenreHandler);

/*
  POST /genres
  Create a new genre
*/
router.post("/", adminAuthMiddlewareView, CreateGenreHandler);

/*
  POST /genres/delete
  Delete a genre by its name
*/
router.post("/delete", adminAuthMiddlewareView, DeleteGenreHandler);

module.exports = router;
