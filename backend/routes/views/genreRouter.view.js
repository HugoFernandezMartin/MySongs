const express = require("express");
const router = express.Router();

const { GetGenreHandler } = require("../../handlers/views/genderHandler.view");

/*
  GET /genres/:genre_id
  Render genre page 
*/
router.get("/:genre_id", GetGenreHandler);

module.exports = router;
