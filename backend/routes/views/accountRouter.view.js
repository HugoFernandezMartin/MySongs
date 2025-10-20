const express = require("express");
const router = express.Router();

const {
  GetAdminMenuHandler,
  GetAccountHandler,
} = require("../../handlers/views/accountHandler.view");
const {
  adminAuthMiddlewareApi,
} = require("../../commons/middlewares/authMiddleware");

/*
  GET /me
  Render account page
*/
router.get("/", GetAccountHandler);

/*
  GET /me/admin
  Render admin menu
*/
router.get("/admin", adminAuthMiddlewareApi, GetAdminMenuHandler);

module.exports = router;
