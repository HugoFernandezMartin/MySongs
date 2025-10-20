const makeResponse = require("../commons/models/response");
const { getUserById } = require("../commons/utils/userUtils");
const { verifyPassword, hashPassword } = require("../commons/utils/hash");
const {
  deleteUser,
  updatePassword,
} = require("../repositories/userRepository");
const {
  GetPlaylists,
  UpdatePicture,
} = require("../repositories/accountRepository");

async function DeleteAccountController(req, res) {
  try {
    //Get password and username from req
    const { password } = req.body;
    const userId = req.session.userId;

    //Check password in db
    const userData = await getUserById(userId);

    await verifyPassword(password, userData.password_hash);

    //Delete user
    await deleteUser(userId);

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

async function UpdatePictureController(file, userId) {
  const routeImage = "avatars/" + file.filename;
  await UpdatePicture(routeImage, userId);
}

async function UpdatePasswordController(req, res) {
  try {
    //Get old password and new password from req
    const { password, newPassword } = req.body;

    //Get user from session
    const userId = req.session.userId;
    const userData = await getUserById(userId);

    //Check correct password
    await verifyPassword(password, userData.password_hash);

    //Hash new password
    const newPasswordHash = await hashPassword(newPassword);

    //Change password
    await updatePassword(userData.user_id, newPasswordHash);

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

async function GetPlaylistsController(userId) {
  const playlists = await GetPlaylists(userId);
  return playlists;
}

module.exports = {
  DeleteAccountController,
  UpdatePasswordController,
  GetPlaylistsController,
  UpdatePictureController,
};
