const {
  CreatePlaylistController,
  GetSongsFromPlaylistController,
} = require("../../controllers/playlistController");
const { getPlaylistById } = require("../../repositories/playlistRepository");

async function CreatePlaylistHandler(req, res) {
  try {
    //Get title from req
    const { title } = req.body;

    //Get user_id from session
    const userId = req.session.userId;

    await CreatePlaylistController(title, userId);

    res.redirect("/me");
  } catch (err) {
    const model = { error: err.message };
    res.render("account", model);
  }
}

async function GetPlaylistHandler(req, res) {
  try {
    //Get id from req
    const { playlist_id } = req.params;
    //Get playlist info
    const playlistData = await getPlaylistById(playlist_id);
    //Get songs from playlist
    const songs = await GetSongsFromPlaylistController(playlist_id);
    //Render playlist page
    model = { playlist: playlistData, songs };
    res.render("playlist", model);
  } catch (err) {
    console.log("GetPlaylistHandler Error: ", err.message);
    model = { error: err.message };
    res.render("playlist", model);
  }
}

module.exports = { CreatePlaylistHandler, GetPlaylistHandler };
