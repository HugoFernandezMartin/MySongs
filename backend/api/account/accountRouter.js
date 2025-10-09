const express = require("express");
const router = express.Router();
const {
  DeleteAccountController,
  UpdatePasswordController,
  GetPlaylistsController,
  UpdatePictureController,
} = require("./accountController");
const {
  userAuthMiddleware,
} = require("../../commons/middlewares/authMiddleware");

/*
  DELETE /me/delete
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
router.delete("/delete", userAuthMiddleware, DeleteAccountController);

/*
    PUT /me/update_password
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
router.put("/update_password", userAuthMiddleware, UpdatePasswordController);

/*
    PUT /me/update_picture
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
router.put("/update_picture", userAuthMiddleware, UpdatePictureController);

/*
  GET /me/playlists
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
router.get("/playlists", userAuthMiddleware, GetPlaylistsController);

module.exports = router;
