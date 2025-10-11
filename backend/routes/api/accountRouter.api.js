const express = require("express");
const router = express.Router();
const {
  DeleteAccountController,
  UpdatePasswordController,
  UpdatePictureController,
} = require("../../controllers/accountController");
const {
  ListPlaylistsHandler,
} = require("../../handlers/api/accountHandler.api");

/*
  DELETE /api/me/delete
  Delete user account

  Body Params:
    password: string

  Response:
    {
      success: boolean,
      message: string,
      responseObject: null,
      statusCode: number
    }

  Example Response:
    {
      success: true,
      message: "Account deleted succesfully",
      responseObject: null,
      statusCode: 200
    }
*/
router.delete("/delete", DeleteAccountController);

/*
    PUT /api/me/update_password
    Update user's password
    
    Body Params:
      password: string
      newPassword: string
 
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
        message: "Password changed succesfully",
        responseObject: 2,
        statusCode: 200
      } 
*/
router.put("/update_password", UpdatePasswordController);

/*
    PUT /api/me/update_picture
    Update user's profile picture
    
    Body Params:
      picture: file
 
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
        message: "Profile picture changed succesfully",
        responseObject: 2,
        statusCode: 200
      } 
*/
router.put("/update_picture", UpdatePictureController);

/*
  GET /api/me/playlists
  Return playlists from user

  Response:
    {
      success: boolean,
      message: string,
      responseObject: Playlist[],
      statusCode: number
    }

  Example Response:
    {
      success: true,
      message: "Playlists retrieved succesfully",
      responseObject:
          [{
            playlist_id: 1,
            title: "Hiking 2025",
            owner_id: 1,
            created_at: 2025-10-02
          },
          ],
      statusCode: 200
    }
*/
router.get("/playlists", ListPlaylistsHandler);

module.exports = router;
