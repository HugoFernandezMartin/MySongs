const express = require("express");
const router = express.Router();

const {
  CreatePlaylistController,
  DeletePlaylistController,
  AddSongController,
  RemoveSongController,
  GetSongsController,
} = require("./playlistController");

/*
    POST /playlists
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
router.post("/", CreatePlaylistController);

/*
    DELETE /playlists/:playlist_id
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
router.delete("/:playlist_id", DeletePlaylistController);

/*
    POST /playlists/:playlist_id/songs
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
    DELETE /playlists/:playlist_id/songs/:song_id
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
    GET /playlists/:playlist_id/songs
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
router.get("/:playlist_id/songs", GetSongsController);

module.exports = router;
