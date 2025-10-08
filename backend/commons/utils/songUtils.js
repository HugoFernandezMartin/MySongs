const { initDB } = require("../../db/database");
const db = initDB();

//Get song data
async function getSongById(song_id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM songs WHERE song_id = ?";
    db.get(sql, [song_id], (err, row) => {
      if (err) {
        return reject(err);
      }
      if (!row) {
        return reject({ code: "NOT_FOUND", message: "Song not found" });
      }
      return resolve(row);
    });
  });
}

module.exports = { getSongById };
