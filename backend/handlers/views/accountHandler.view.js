const { getUserById } = require("../../commons/utils/userUtils");
const {
  GetPlaylistsController,
} = require("../../controllers/accountController");

async function GetAccountHandler(req, res) {
  try {
    //Get id from session
    const userId = req.session.userId;

    //Get picture
    const userData = await getUserById(userId);

    //Get playlists
    const playlists = await GetPlaylistsController(userId);

    const model = { user: userData, playlists };
    res.render("account", model);
  } catch (err) {
    console.error("GetAccountHandler Error: ", err.message);
    const model = { error: err.message };
    response.render("account", model);
  }
}

async function GetAdminMenuHandler(_req, res) {
  res.render("admin");
}

module.exports = { GetAccountHandler, GetAdminMenuHandler };
