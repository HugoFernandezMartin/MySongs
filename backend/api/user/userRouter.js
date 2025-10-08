const express = require("express");
const router = express.Router();
const {
  CreateUserController,
  GetUsersController,
  GetUserByIdController,
  GetPlaylistsController,
} = require("./userController.js");

/*
  POST /users
  Creates a new user.

  Body Params:
    username: string 
    password: string

  Response:
    {
      success: boolean,
      message: string,
      responseObject: User,
      statusCode: number
    }

  Example Response:
    {
      success: true,
      message: "User created succesfully",
      responseObject:
        {
          id: 1,
          username: "diego.wav",
          password: "1234",
        },
      statusCode: 200
    }
*/
router.post("/", CreateUserController);

/*
  GET /users
  Return all users.

  Response:
    {
      success: boolean,
      message: string,
      responseObject: User[],
      statusCode: number
    }

  Example Response:
    {
      success: true,
      message: "Users retrieved succesfully",
      responseObject:[
          {
            id: 1,
            username: "diego.wav",
            password: "1234",
          },
          {
            id: 2,
            username: "angelica123",
            password: "1234",
          }
        ],
      statusCode: 200
    }
*/
router.get("/", GetUsersController);

/*
  GET /users/:id
  Return a user by id.

  Response:
    {
      success: boolean,
      message: string,
      responseObject: User,
      statusCode: number
    }

  Example Response:
    {
      success: true,
      message: "User retrieved succesfully",
      responseObject:
          {
            id: 1,
            username: "diego.wav",
            password: "1234",
          },
      statusCode: 200
    }
*/
router.get("/:id", GetUserByIdController);

module.exports = router;
