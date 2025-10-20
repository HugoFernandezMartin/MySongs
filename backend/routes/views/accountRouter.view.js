const express = require("express");
const router = express.Router();

const {
  GetAdminMenuHandler,
  GetAccountHandler,
} = require("../../handlers/views/accountHandler.view");
const {
  adminAuthMiddlewareView,
  userAuthMiddlewareView,
} = require("../../commons/middlewares/authMiddleware");

/*
  GET /me
  Render account page
*/
router.get("/", userAuthMiddlewareView, GetAccountHandler);

/*
  GET /me/admin
  Render admin menu
*/
router.get("/admin", adminAuthMiddlewareView, GetAdminMenuHandler);

module.exports = router;
