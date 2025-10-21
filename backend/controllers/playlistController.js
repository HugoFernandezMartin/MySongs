const {
  AddPlaylist,
  DeletePlaylist,
  AddSongToPlaylist,
  DeleteSongFromPlaylist,
  getPlaylistById,
  getSongsFromPlaylist,
} = require("../repositories/playlistRepository");

async function CreatePlaylistController(title, userId) {
  if (!title.trim()) {
    throw new Error("Title cannot be empty");
  }
  //Create playlist
  const playlistId = await AddPlaylist(title, userId);
  return playlistId;
}

async function DeletePlaylistController(playlist_id) {
  //Delete playlist
  await DeletePlaylist(playlist_id);
}

async function AddSongToPlaylistController(playlist_id, song_id) {
  //Check existing playlist
  await getPlaylistById(playlist_id);

  await AddSongToPlaylist(playlist_id, song_id);
}

async function RemoveSongController(playlist_id, song_id) {
  //Check if playlist exists
  await getPlaylistById(playlist_id);

  await DeleteSongFromPlaylist(playlist_id, song_id);
}

async function GetSongsFromPlaylistController(playlist_id) {
  //Check existing playlist
  await getPlaylistById(playlist_id);

  //Retrieve all songs from playlist
  const songs = await getSongsFromPlaylist(playlist_id);

  return songs;
}

module.exports = {
  CreatePlaylistController,
  DeletePlaylistController,
  AddSongToPlaylistController,
  RemoveSongController,
  GetSongsFromPlaylistController,
};
