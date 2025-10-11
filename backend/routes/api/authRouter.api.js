const express = require("express");
const router = express.Router();
const {
  userAuthMiddleware,
} = require("../../commons/middlewares/authMiddleware");
const {
  LogoutHandler,
  LoginHandler,
  RegisterHandler,
} = require("../../handlers/api/authHandler.api");

/*
  POST /api/auth/register
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
router.post("/register", RegisterHandler);

/*
    POST /api/auth/login
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
router.post("/login", LoginHandler);

/*
    GET /api/auth/logout
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
router.get("/logout", userAuthMiddleware, LogoutHandler);

module.exports = router;
