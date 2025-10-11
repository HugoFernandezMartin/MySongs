const { initDB } = require("../db/database");
const db = initDB();

async function AddGenre(name, description) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO genres (name, description) VALUES (?, ?)`,
      [name, description],
      function (err) {
        if (err) return reject(err);
        const newID = this.lastID;
        console.log(`Created Genre ${name}`);
        resolve(newID);
      }
    );
  });
}

async function RemoveGenre(genre_id) {
  const query = "DELETE FROM genres WHERE genre_id = ?";

  return new Promise((resolve, reject) => {
    db.run(query, [genre_id], function (err) {
      if (err) {
        return reject({ code: "DB_ERROR", message: err.message });
      }
      if (this.changes === 0) {
        return reject({ code: "NOT_FOUND", message: "Genre not found" });
      }
      console.log(`Deleted genre with ID ${genre_id}`);
      resolve({ deleted: this.changes });
    });
  });
}

async function GetGenres() {
  const query = "SELECT * FROM genres";
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
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
async function GetSongsFromGenre(genre_id) {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT s.* FROM songs s JOIN genres g on s.genre_id = g.genre_id WHERE g.genre_id = ?";
    db.all(sql, [genre_id], (err, rows) => {
      if (err) return reject(err);
      else return resolve(rows);
    });
  });
}

module.exports = {
  AddGenre,
  RemoveGenre,
  GetGenres,
  GetGenreById,
  GetSongsFromGenre,
};
