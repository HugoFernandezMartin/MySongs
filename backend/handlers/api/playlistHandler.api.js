const makeResponse = require("../../commons/models/response");
const {
  CreatePlaylistController,
} = require("../../controllers/playlistController");

async function CreatePlaylistHandler(req, res) {
  try {
    //Get title from req
    const { title } = req.body;

    //Get user_id from session
    const userId = req.session.userId;

    const playlistId = await CreatePlaylistController(title, userId);

    res
      .status(200)
      .json(
        makeResponse(true, "Playlist created succesfully", playlistId, 200)
      );
  } catch (err) {
    console.log("CreatePlaylistHandler Error: ", err.message);
    res
      .status(500)
      .json(makeResponse(false, "Unable to create playlist", err.message, 500));
  }
}

module.exports = { CreatePlaylistHandler };
