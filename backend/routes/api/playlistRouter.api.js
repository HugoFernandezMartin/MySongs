const express = require("express");
const router = express.Router();

const {
  AddSongController,
  RemoveSongController,
} = require("../../controllers/playlistController");
const {
  CreatePlaylistHandler,
  GetSongsFromPlaylistHandler,
  DeletePlaylistHandler,
} = require("../../handlers/api/playlistHandler.api");
const {
  userAuthMiddlewareApi,
} = require("../../commons/middlewares/authMiddleware");

/*
    POST /api/playlists
    Create new playlist
    
    Body Params:
      title: string
 
    Response:
      {
        success: boolean,
        message: string,
        responseObject: number, (playlist_id)
        statusCode: number
      }

    Example Response:
      {
        success: true,
        message: "Playlist created succesfully",
        responseObject: 2,
        statusCode: 200
      } 
*/
router.post("/", userAuthMiddlewareApi, CreatePlaylistHandler);

/*
    DELETE /api/playlists/:playlist_id
    Delete a playlist

    Response:
      {
        success: boolean,
        message: string,
        responseObject: null
        statusCode: number
      }

    Example Response:
      {
        success: true,
        message: "Playlist deleted succesfully",
        responseObject: null,
        statusCode: 200
      } 
*/
router.delete("/:playlist_id", DeletePlaylistHandler);

/*
    POST /api/playlists/:playlist_id/songs
    Add a song to a playlist
    
    Body Params:
      song_id: number (id)    

    Response:
      {
        success: boolean,
        message: string,
        responseObject: null
        statusCode: number
      }

    Example Response:
      {
        success: true,
        message: "Song added succesfully",
        responseObject: null
        statusCode: 200
      } 
*/
router.post("/:playlist_id/songs", AddSongController);

/*
    DELETE /api/playlists/:playlist_id/songs/:song_id
    Remove song from playlist

    Response:
      {
        success: boolean,
        message: string,
        responseObject: null
        statusCode: number
      }

    Example Response:
      {
        success: true,
        message: "Songs removed succesfully from playlist",
        responseObject: null
        statusCode: 200
      } 
*/
router.delete("/:playlist_id/songs/:song_id", RemoveSongController);

/*
    GET /api/playlists/:playlist_id/songs
    Return songs in playlist

    Response:
      {
        success: boolean,
        message: string,
        responseObject: Song[]
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
router.get("/:playlist_id/songs", GetSongsFromPlaylistHandler);

module.exports = router;
