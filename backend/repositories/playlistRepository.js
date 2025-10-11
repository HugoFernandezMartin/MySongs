const { initDB } = require("../db/database");
const db = initDB();

async function AddPlaylist(title, userId) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO playlists (title, owner_id) VALUES (?, ?)`,
      [title, userId],
      function (err) {
        if (err) return reject(err);
        const newID = this.lastID;
        console.log(`Created Playlist ${title}`);
        resolve(newID);
      }
    );
  });
}

async function getPlaylistById(playlistId) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM playlists WHERE playlist_id = ?";
    db.get(sql, [playlistId], (err, row) => {
      if (err) return reject(err);
      if (!row)
        return reject({ code: "NOT_FOUND", message: "Playlist not found" });
      else return resolve(row);
    });
  });
}

async function DeletePlaylist(playlistId) {
  const query = "DELETE FROM playlists WHERE playlist_id = ?";

  return new Promise((resolve, reject) => {
    db.run(query, [playlistId], function (err) {
      if (err) {
        return reject({ code: "DB_ERROR", message: err.message });
      }
      if (this.changes === 0) {
        return reject({ code: "NOT_FOUND", message: "Playlist not found" });
      }
      console.log(`Deleted playlist with ID ${playlistId}`);
      resolve({ deleted: this.changes });
    });
  });
}

// Add song to playlist
async function AddSongToPlaylist(playlistId, songId) {
  return new Promise((resolve, reject) => {
    console.log(`playlist: ${playlistId}, song: ${songId}`);
    db.run(
      `INSERT INTO songs_playlists (playlist_id, song_id) VALUES (?, ?)`,
      [playlistId, songId],
      function (err) {
        if (err) {
          if (err.code === "SQLITE_CONSTRAINT") {
            return reject({
              code: "ALREADY_EXISTS",
              message: "This song is already in the playlist",
            });
          }
          return reject({
            code: "DB_ERROR",
            message: err.message,
          });
        }
        console.log(
          `Added song with ID: ${songId} to playlist with ID: ${playlistId}`
        );
        resolve({ playlistId, songId });
      }
    );
  });
}

async function DeleteSongFromPlaylist(playlist_id, song_id) {
  const query =
    "DELETE FROM songs_playlists WHERE playlist_id = ? AND song_id = ?";

  return new Promise((resolve, reject) => {
    db.run(query, [playlist_id, song_id], function (err) {
      if (err) {
        return reject({ code: "DB_ERROR", message: err.message });
      }
      if (this.changes === 0) {
        return reject({
          code: "NOT_FOUND",
          message: "Song was not in playlist",
        });
      }
      console.log(
        `Deleted song with ID ${song_id} from playlist with ID: ${playlist_id}`
      );
      resolve({ deleted: this.changes });
    });
  });
}

async function getSongsFromPlaylist(playlistId) {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT s.* FROM songs s JOIN songs_playlists sp on s.song_id = sp.song_id WHERE sp.playlist_id = ?";
    db.all(sql, [playlistId], (err, rows) => {
      if (err) return reject(err);
      else return resolve(rows);
    });
  });
}

module.exports = {
  AddPlaylist,
  DeletePlaylist,
  getPlaylistById,
  AddSongToPlaylist,
  DeleteSongFromPlaylist,
  getSongsFromPlaylist,
};
