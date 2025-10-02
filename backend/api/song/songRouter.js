const express = require("express");
const getSongsController = require("./songController");
const router = express.Router();

/*
  GET /songs
  Get all songs filtered by query params.
  If a param is missing or null it means the filter is not applied.

  Query Params:
    author: string (optional)
    genre: string (optional)
    album: string (optional)

  Response:
    {
      success: boolean,
      message: string,
      responseObject: Song[],
      statusCode: number
    }

  Example Response:
    {
      success: true,
      message: "Songs retrieved successfully",
      responseObject: [
        {
          id: 1,
          title: "November Rain",
          author: "Guns and Roses",
          genre: "Rock",
          album: "Use Your Illusion I"
        }
      ],
      statusCode: 200
    }
*/
router.get("/", getSongsController);

module.exports = router;
