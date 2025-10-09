const makeResponse = require("../../commons/models/response");
const { getUserById } = require("../../commons/utils/userUtils");
const { verifyPassword, hashPassword } = require("../auth/authService");
const { deleteUser, updatePassword } = require("../user/userRepository");
const { GetPlaylists, UpdatePicture } = require("./accountRepository");
const { deletePicture, savePicture } = require("./accountService");

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

async function UpdatePictureController(req, res) {
  try {
    //Get data from request
    const { picture } = req.body;

    //Get user from session
    const userId = req.session.userId;
    const userData = await getUserById(userId);

    //Delete old picture if exists
    if (userData.profile_picture) {
      await deletePicture(userData.profile_picture);
    }

    //Save new picture
    const pictureRoute = String(`avatars/${userData.username}.png`);
    await savePicture(picture, pictureRoute);

    //Link picture to user in db
    await UpdatePicture(pictureRoute, userId);

    res
      .status(200)
      .json(
        makeResponse(true, "Profile Picture updated succesfully", null, 200)
      );
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
      .json(
        makeResponse(
          false,
          "Unable to change profile picture",
          err.message,
          500
        )
      );
  }
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

async function GetPlaylistsController(req, res) {
  try {
    //Get id from session
    const userId = req.session.userId;

    //Get playlists
    const playlists = await GetPlaylists(userId);

    res
      .status(200)
      .json(
        makeResponse(true, "Playlists retrieved succesfully", playlists, 200)
      );
  } catch (err) {
    res
      .status(500)
      .json(makeResponse(false, "Unable to get playlists", err.message, 500));
  }
}

module.exports = {
  DeleteAccountController,
  UpdatePasswordController,
  GetPlaylistsController,
  UpdatePictureController,
};
