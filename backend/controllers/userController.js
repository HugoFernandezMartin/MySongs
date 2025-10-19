const makeResponse = require("../commons/models/response.js");
const { hashPassword } = require("../commons/utils/hash.js");
const { createUser, getUsers } = require("../repositories/userRepository.js");
const { getUserById } = require("../commons/utils/userUtils.js");
const makeUser = require("../commons/models/user.js");

async function CreateUserController(req, res) {
  try {
    const { username, password, isAdmin } = req.body;
    const password_hash = await hashPassword(password);
    const userId = await createUser(username, password_hash, isAdmin);
    const user = makeUser(userId, username, isAdmin);
    res
      .status(200)
      .json(makeResponse(true, "User created succesfully", user, 200));
  } catch (error) {
    console.log("CreateUserController Error: ", error.message);
    res
      .status(500)
      .json(makeResponse(false, "Error creating user", error.message, 500));
  }
}

async function GetUsersController(_req, res) {
  try {
    const users = await getUsers();
    res
      .status(200)
      .json(makeResponse(true, "Users retrieved succesfully", users, 200));
  } catch (error) {
    console.log("GetUsersController Error: ", error.message);
    res
      .status(500)
      .json(makeResponse(false, "Error retrieving users", error.message, 500));
  }
}

async function GetUserByIdController(req, res) {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    res
      .status(200)
      .json(makeResponse(true, "User retrieved succesfully", user, 200));
  } catch (error) {
    console.log("GetUserByIdController Error: ", error.message);
    res
      .status(500)
      .json(makeResponse(false, "Error retrieving user", error.message, 500));
  }
}

module.exports = {
  CreateUserController,
  GetUsersController,
  GetUserByIdController,
};
