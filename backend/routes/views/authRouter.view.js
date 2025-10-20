const express = require("express");
const router = express.Router();

const {
  GetLoginHandler,
  LogoutHandler,
  PostLoginHandler,
  GetRegisterHandler,
  PostRegisterHandler,
} = require("../../handlers/views/authHandler.view");
const {
  userAuthMiddlewareView,
} = require("../../commons/middlewares/authMiddleware");

/*
    GET /auth/register
    Render the register form
*/
router.get("/register", GetRegisterHandler);

/*
    POST /auth/register
    Register user
    
    Body Params:
      username: string
      password: string

*/
router.post("/register", PostRegisterHandler);

/*
    GET /auth/login
    Render the login form
*/
router.get("/login", GetLoginHandler);

/*
    POST /auth/login
    Login user
    
    Body Params:
      username: string
      password: string

*/
router.post("/login", PostLoginHandler);

/*
    GET /auth/logout
    Log out and render login
*/
router.get("/logout", userAuthMiddlewareView, LogoutHandler);

module.exports = router;
