const makeResponse = require("../../commons/models/response");
const {
  GetPlaylistsController,
} = require("../../controllers/accountController");

async function ListPlaylistsHandler(req, res) {
  try {
    //Get id from session
    const userId = req.session.userId;
    const playlists = await GetPlaylistsController(userId);

    res
      .status(200)
      .json(
        makeResponse(true, "Playlists retrieved succesfully", playlists, 200)
      );
  } catch (err) {
    console.error("ListPlaylistHandler Error: ", err.message);
    res
      .status(500)
      .json(
        makeResponse(false, "Unable to retrieve playlists", err.message, 500)
      );
  }
}

module.exports = { ListPlaylistsHandler };
