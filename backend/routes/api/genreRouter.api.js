const express = require("express");
const router = express.Router();

const {
  CreateGenreController,
  DeleteGenreController,
  GetGenresController,
  GetGenreByIdController,
  GetSongsFromGenreController,
} = require("../../controllers/genreController");
const {
  adminAuthMiddlewareApi,
} = require("../../commons/middlewares/authMiddleware");

/*
    POST /api/genres
    Create new genre
    
    Body Params:
      name: string
      description: string
 
    Response:
      {
        success: boolean,
        message: string,
        responseObject: number, (genre_id)
        statusCode: number
      }

    Example Response:
      {
        success: true,
        message: "Genre created succesfully",
        responseObject: 2,
        statusCode: 200
      } 
*/
router.post("/", adminAuthMiddlewareApi, CreateGenreController);

/*
    DELETE /api/genres/:genre_id
    Delete a genre
 
    Response:
      {
        success: boolean,
        message: string,
        responseObject: number, (genre_id)
        statusCode: number
      }

    Example Response:
      {
        success: true,
        message: "Genre deleted succesfully",
        responseObject: 2,
        statusCode: 200
      } 
*/
router.delete("/:genre_id", adminAuthMiddlewareApi, DeleteGenreController);

/*

    GET /api/genres
    Get all genres
 
    Response:
      {
        success: boolean,
        message: string,
        responseObject: Genre[]
        statusCode: number
      }

    Example Response:
      {
        success: true,
        message: "Genres retrieved succesfully",
        responseObject: [
        {
            genre_id: 1
            name: "Pop"
            description: "Mainstream catchy melodies"
        },
        {
            genre_id: 2
            name: "Rock"
            description: "Electric guitars and powerful drums"
        }]
        statusCode: 200
      } 
*/
router.get("/", GetGenresController);

/*
    GET /api/genres/:genre_id
    Get a genre by its id
 
    Response:
      {
        success: boolean,
        message: string,
        responseObject: Genre,
        statusCode: number
      }

    Example Response:
      {
        success: true,
        message: "Genre retrieved succesfully",
        responseObject: {
            genre_id: 1
            name: "Rock"
            description: "Electric guitars and powerful dreams"
        },
        statusCode: 200
      } 
*/
router.get("/:genre_id", GetGenreByIdController);

/*
    GET /api/genres/genre_id/songs
    Get songs from genre
 
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
        message: "Songs returned succesfully",
        responseObject: [
        {
          id: 1,
          title: "November Rain",
          author: "Guns and Roses",
          genre: "Rock",
          album: "Use Your Illusion I"
        },
        {
          id: 2,
          title: "Dust N' Bones",
          author: "Guns and Roses",
          genre: "Rock",
          album: "Use Your Illusion I"
        }]
        statusCode: 200
      } 
*/
router.get("/:genre_id/songs", GetSongsFromGenreController);

module.exports = router;
