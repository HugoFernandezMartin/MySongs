const { initDB } = require("../../db/database.js");
const db = initDB();

async function GetAlbumByName(albumName) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM albums WHERE title = ?";
    db.get(sql, [albumName], (err, row) => {
      if (err) {
        return reject({ code: "DB_ERROR", message: err.message });
      }
      if (!row) {
        return reject({ code: "NOT_FOUND", message: "Album not found" });
      }
      resolve(row);
    });
  });
}

module.exports = { GetAlbumByName };
