const makeResponse = require("../../commons/models/response");
const {
  CreatePlaylistController,
  GetSongsFromPlaylistController,
  DeletePlaylistController,
  RemoveSongController,
  AddSongToPlaylistController,
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

async function GetSongsFromPlaylistHandler(req, res) {
  try {
    const { playlist_id } = req.params;
    const songs = await GetSongsFromPlaylistController(playlist_id);

    res
      .status(200)
      .json(
        makeResponse(
          true,
          "Songs from playlist retrieved successfully",
          songs,
          200
        )
      );
  } catch (err) {
    console.log("GetSongsFromPlaylistHandler Error: ", err.message);
    res
      .status(500)
      .json(makeResponse(false, "Unable to retrieve songs", err.message, 500));
  }
}

async function DeletePlaylistHandler(req, res) {
  try {
    //Get playlist id from query
    const { playlist_id } = req.params;

    //Delete playlist
    await DeletePlaylistController(playlist_id);

    res
      .status(200)
      .json(makeResponse(true, "Playlist deleted succesfully", 200));
  } catch (err) {
    if (err.code === "NOT_FOUND") {
      res
        .status(401)
        .json(
          makeResponse(false, "Unable to delete playlist", err.message, 401)
        );
    }
    res
      .status(500)
      .json(makeResponse(false, "Unable to delete playlist", err.message, 500));
  }
}

async function RemoveSongFromPlaylistHandler(req, res) {
  try {
    const { playlist_id, song_id } = req.params;
    console.log(`Check params: ${playlist_id}, ${song_id}`);

    //Delete song from playlist
    await RemoveSongController(playlist_id, song_id);

    res
      .status(200)
      .json(makeResponse(true, "Song removed from playlist succesfully", 200));
  } catch (err) {
    if (err.code === "NOT_FOUND") {
      res
        .status(401)
        .json(
          makeResponse(false, "Unable to find resources", err.message, 401)
        );
    }
    res
      .status(500)
      .json(
        makeResponse(
          false,
          "Unable to remove song from playlist",
          err.message,
          500
        )
      );
  }
}

async function AddSongToPlaylistHandler(req, res) {
  try {
    //Get playlist and song from request
    const { playlist_id } = req.params;
    const { songId } = req.body;

    //Add song to Playlist
    await AddSongToPlaylistController(playlist_id, songId);

    res
      .status(200)
      .json(makeResponse(true, "Song added to playlist succesfully"), 200);
  } catch (err) {
    if (err.code === "NOT FOUND") {
      res
        .status(401)
        .json(
          makeResponse(false, "Unable to find resources", err.message, 401)
        );
    }
    res
      .status(500)
      .json(
        makeResponse(false, "Unable to add song to playlist", err.message, 500)
      );
  }
}
module.exports = {
  CreatePlaylistHandler,
  GetSongsFromPlaylistHandler,
  DeletePlaylistHandler,
  RemoveSongFromPlaylistHandler,
  AddSongToPlaylistHandler,
};
