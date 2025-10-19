const express = require("express");
const { GetSongsController } = require("../../controllers/songController");
const {
  GetSongsSearchHandler,
  GetSongsHandler,
} = require("../../handlers/api/songHandler.api");
const router = express.Router();

/*
  GET /api/songs
  Get all songs filtered by query params.
  If a param is missing or null it means the filter is not applied.

  Query Params:
    author: string (optional)
    genre: string (optional)
    album: string (optional)
    page: number
    limit: number

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
router.get("/", GetSongsHandler);

/*
  GET /api/songs/search
  Get songs filtered by search bar.

  Query Params:
    q: string
    limit: number

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
router.get("/search", GetSongsSearchHandler);

module.exports = router;
