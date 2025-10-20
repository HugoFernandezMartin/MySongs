const express = require("express");
const router = express.Router();

const {
  GetGenreHandler,
  CreateGenreHandler,
  DeleteGenreHandler,
} = require("../../handlers/views/genderHandler.view");

/*
  GET /genres/:genre_id
  Render genre page 
*/
router.get("/:genre_id", GetGenreHandler);

/*
  POST /genres
  Create a new genre
*/
router.post("/", CreateGenreHandler);

/*
  POST /genres/delete
  Delete a genre by its name
*/
router.post("/delete", DeleteGenreHandler);

module.exports = router;
