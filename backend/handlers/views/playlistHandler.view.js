const {
  CreatePlaylistController,
  GetSongsFromPlaylistController,
  DeletePlaylistController,
  AddSongController,
  RemoveSongController,
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

async function DeletePlaylistHandler(req, res) {
  try {
    const { playlist_id } = req.body;
    await DeletePlaylistController(playlist_id);
    res.redirect("/me");
  } catch (err) {
    console.log("DeletePlaylistHandler Error: ", err.message);
    model = { error: err.message };
    res.render("account", model);
  }
}

async function AddSongToPlaylistHandler(req, res) {
  try {
    const { playlist_id } = req.params;
    const { song_id } = req.body;
    await AddSongController(playlist_id, song_id);
    res.redirect(`/playlists/${playlist_id}`);
  } catch (err) {
    console.log("AddSongToPlaylistHandler Error: ", err.message);
    model = { error: err.message };
    res.render("account", model);
  }
}

async function DeleteSongFromPlaylistHandler(req, res) {
  try {
    const { playlist_id } = req.params;
    const { song_id } = req.body;
    await RemoveSongController(playlist_id, song_id);
    res.redirect(`/playlists/${playlist_id}`);
  } catch (err) {}
  console.log("RemoveSongFromPlaylistHandler Error: ", err.message);
  model = { error: err.message };
  res.render("playlist", model);
}

module.exports = {
  CreatePlaylistHandler,
  GetPlaylistHandler,
  DeletePlaylistHandler,
  AddSongToPlaylistHandler,
  DeleteSongFromPlaylistHandler,
};
