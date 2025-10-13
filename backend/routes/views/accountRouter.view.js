const express = require("express");
const router = express.Router();

const {
  ListPlaylistsHandler,
  GetAccountHandler,
} = require("../../handlers/views/accountHandler.view");

/*
  GET /me
  Render account page
*/
router.get("/", GetAccountHandler);

module.exports = router;
