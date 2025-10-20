const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "public/avatars/" });

const {
  GetAdminMenuHandler,
  GetAccountHandler,
  UpdatePictureHandler,
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

/*
  POST /me/upload_picture
  Update profile picture
*/
router.post("/upload_picture", upload.single("avatar"), UpdatePictureHandler);

module.exports = router;
