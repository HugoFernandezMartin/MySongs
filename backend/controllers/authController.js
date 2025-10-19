const { hashPassword, verifyPassword } = require("../commons/utils/hash");
const { registerUser } = require("../repositories/authRepository");
const { getUserByName } = require("../commons/utils/userUtils");
const makeResponse = require("../commons/models/response");

async function RegisterUserController(username, password, confirm_password) {
  if (password !== confirm_password) {
    throw new Error("Passwords dont match");
  }
  const password_hash = await hashPassword(password);
  const userId = await registerUser(username, password_hash);
  return userId;
}

async function LoginController(username, password) {
  //Search username in db
  let user = await getUserByName(username);
  //Compare introduced password with hash in db
  await verifyPassword(password, user.password_hash);
  return user;
}

module.exports = { RegisterUserController, LoginController };
