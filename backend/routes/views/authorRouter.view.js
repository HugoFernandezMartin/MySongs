const express = require("express");
const router = express.Router();

const {
  CreateAuthorHandler,
  DeleteAuthorHandler,
} = require("../../handlers/views/authorHandler.view");

const {
  adminAuthMiddlewareView,
} = require("../../commons/middlewares/authMiddleware");

/*
  POST /genres
  Create a new genre
*/
router.post("/", adminAuthMiddlewareView, CreateAuthorHandler);

/*
  POST /genres/delete
  Delete a genre by its name
*/
router.post("/delete", adminAuthMiddlewareView, DeleteAuthorHandler);

module.exports = router;
