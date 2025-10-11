const {
  GetPlaylistsController,
} = require("../../controllers/accountController");

async function ListPlaylistsHandler(req, res) {
  try {
    //Get id from session
    const userId = req.session.userId;
    const playlists = await GetPlaylistsController(userId);

    const model = { playlists };
    res.render("playlists", model);
  } catch (err) {
    console.error("ListPlaylistHandler Error: ", err.message);
    const model = { error: err.message };
    response.render("playlists", model);
  }
}

module.exports = { ListPlaylistsHandler };
