const express = require("express");
const router = express.Router();
const {
  DeleteAccountController,
  UpdatePasswordController,
} = require("./accountController");

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
router.delete("/delete", DeleteAccountController);

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
router.put("/update_password", UpdatePasswordController);

module.exports = router;
