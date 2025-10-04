const makeResponse = require("../../commons/models/response");
const { getSongById } = require("../../commons/utils/songUtils");
const {
  AddPlaylist,
  DeletePlaylist,
  AddSongToPlaylist,
  DeleteSongFromPlaylist,
  getPlaylistById,
  getSongsFromPlaylist,
} = require("./playlistRepository");

async function CreatePlaylistController(req, res) {
  try {
    //Get title from req
    const { title } = req.body;

    //Get user_id from session
    const userId = req.session.userId;

    //Create playlist
    const playlistId = await AddPlaylist(title, userId);

    res
      .status(200)
      .json(
        makeResponse(true, "Playlist created succesfully", playlistId, 200)
      );
  } catch (err) {
    res
      .status(500)
      .json(makeResponse(false, "Unable to create playlist", err.message, 500));
  }
}

async function DeletePlaylistController(req, res) {
  try {
    //Get playlist id from query
    const { playlist_id } = req.params;

    //Delete playlist
    await DeletePlaylist(playlist_id);

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

async function AddSongController(req, res) {
  try {
    //Get playlist and song from request
    const { playlist_id } = req.params;
    const { songId } = req.body;

    //Check existing playlist
    await getPlaylistById(playlist_id);

    //Check existing song
    await getSongById(songId);

    //Add song to Playlist
    await AddSongToPlaylist(playlist_id, songId);

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

async function RemoveSongController(req, res) {
  try {
    const { playlist_id, song_id } = req.params;
    console.log(`Check params: ${playlist_id}, ${song_id}`);

    //Check playlist exists
    await getPlaylistById(playlist_id);

    //Delete song from playlist
    await DeleteSongFromPlaylist(playlist_id, song_id);

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

async function GetSongsController(req, res) {
  try {
    //Get playlistId from query
    const { playlist_id } = req.params;

    //Check existing playlist
    await getPlaylistById(playlist_id);

    //Retrieve all songs from playlist
    const songs = await getSongsFromPlaylist(playlist_id);

    res
      .status(200)
      .json(
        makeResponse(
          true,
          "Songs from playlist retrieved succesfully",
          songs,
          200
        )
      );
  } catch (err) {
    if (err.code === "NOT_FOUND") {
      res
        .status(401)
        .json(makeResponse(false, "Unable to get resources", err.message, 401));
    }
    res
      .status(500)
      .json(
        makeResponse(
          false,
          "Unable to get songs from playlist",
          err.message,
          500
        )
      );
  }
}

module.exports = {
  CreatePlaylistController,
  DeletePlaylistController,
  AddSongController,
  RemoveSongController,
  GetSongsController,
};
