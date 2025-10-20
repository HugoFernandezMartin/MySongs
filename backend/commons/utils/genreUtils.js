const { initDB } = require("../../db/database.js");
const db = initDB();

async function GetGenreByName(genreName) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM genres WHERE LOWER(TRIM(name)) = LOWER(TRIM(?))";
    db.get(sql, [genreName], (err, row) => {
      if (err) {
        return reject({ code: "DB_ERROR", message: err.message });
      }
      if (!row) {
        return reject({ code: "NOT_FOUND", message: "Genre not found" });
      }
      resolve(row);
    });
  });
}

async function GetGenreById(genre_id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM genres WHERE genre_id = ?";
    db.get(sql, [genre_id], (err, row) => {
      if (err) {
        return reject(err);
      }
      if (!row) {
        return reject({ code: "NOT_FOUND", message: "Genre not found" });
      }
      return resolve(row);
    });
  });
}

module.exports = { GetGenreByName, GetGenreById };
