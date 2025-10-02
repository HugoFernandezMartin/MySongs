const makeResponse = require("../../commons/models/response");
const { getUserByName } = require("../../commons/utils/userUtils");
const { verifyPassword, hashPassword } = require("../auth/authService");
const { deleteUser, updatePassword } = require("../user/userRepository");

async function DeleteAccountController(req, res) {
  try {
    //Get password and username from req
    const { password } = req.body;
    const username = req.session.username;

    //Check password in db
    const userData = await getUserByName(username);

    await verifyPassword(password, userData.password_hash);

    //Delete user
    await deleteUser(username);

    res
      .status(200)
      .json(makeResponse(true, "Account deleted succesfully", null, 200));
  } catch (err) {
    if (err.code === "INVALID_PASSWORD") {
      res
        .status(401)
        .json(
          makeResponse(false, "Not allowed to delete user", err.message, 200)
        );
    }
    res
      .status(500)
      .json(makeResponse(false, "Unable to delete user", err.message, 500));
  }
}

async function UpdatePasswordController(req, res) {
  try {
    //Get old password and new password from req
    const { password, newPassword } = req.body;

    //Get username from session
    const username = req.session.username;

    //Get user data
    const userData = await getUserByName(username);

    //Check correct password
    await verifyPassword(password, userData.password_hash);

    //Hash new password
    const newPasswordHash = await hashPassword(newPassword);

    //Change password
    await updatePassword(username, newPasswordHash);

    res
      .status(200)
      .json(
        makeResponse(true, "Password updated succesfully", userData.userId, 200)
      );
  } catch (err) {
    if (err.code === "INVALID_PASSWORD") {
      res
        .status(401)
        .json(
          makeResponse(
            false,
            "Not allowed to change password",
            err.message,
            401
          )
        );
    }
    res
      .status(500)
      .json(makeResponse(false, "Unable to change password", err.message, 500));
  }
}

module.exports = { DeleteAccountController, UpdatePasswordController };
