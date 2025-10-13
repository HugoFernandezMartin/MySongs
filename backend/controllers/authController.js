const { hashPassword, verifyPassword } = require("../commons/utils/hash");
const { registerUser } = require("../repositories/authRepository");
const { getUserByName } = require("../commons/utils/userUtils");
const makeResponse = require("../commons/models/response");

async function RegisterUserController(username, password) {
  const password_hash = await hashPassword(password);
  const userId = await registerUser(username, password_hash);
  return userId;
}

async function LoginController(username, password) {
  console.log(`DATA: ${username}, ${password}`);
  //Search username in db
  let user = await getUserByName(username);
  console.log("user: ", user);
  //Compare introduced password with hash in db
  await verifyPassword(password, user.password_hash);
  return user;
}

module.exports = { RegisterUserController, LoginController };
