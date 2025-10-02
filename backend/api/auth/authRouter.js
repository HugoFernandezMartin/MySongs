const express = require("express");
const router = express.Router();
const {
  RegisterUserController,
  LoginController,
  LogoutController,
} = require("./authController");

/*
  POST /auth/register
  Register an user

  Body Params:
    username: string 
    password: string

  Response:
    {
      success: boolean,
      message: string,
      responseObject: number, (user_id)
      statusCode: number
    }

  Example Response:
    {
      success: true,
      message: "User registered succesfully",
      responseObject: 1,
      statusCode: 200
    }
*/
router.post("/register", RegisterUserController);

/*
    POST /auth/login
    Login user
    
    Body Params:
      username: string
      password: string
 
    Response:
      {
        success: boolean,
        message: string,
        responseObject: number, (user_id)
        statusCode: number
      }

    Example Response:
      {
        success: true,
        message: "User registered succesfully",
        responseObject: 2,
        statusCode: 200
      } 
*/
router.post("/login", LoginController);

/*
    GET /auth/logout
    Logout user
 
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
        message: "Logout Succesfully",
        responseObject: null,
        statusCode: 200
      } 
*/
router.get("/logout", LogoutController);

module.exports = router;
