const { initDB } = require("../../db/database.js");
const db = initDB();

//Create new song
async function createSong(title, author_id, genre_id, album_id, release_date) {
  return new Promise((resolve, reject) => {
    //TODO CHECK RELEASE DATE (db too)
    db.run(
      `INSERT INTO songs (title, author_id, genre_id, album_id, release_date) VALUES (?, ?, ?, ?, ?)`,
      [title, author_id, genre_id, album_id, release_date],
      function (err) {
        if (err) return reject(err);
        console.log(`Created song with ID ${this.lastID}`);
        resolve(this.lastID);
      }
    );
  });
}

//Get song data
async function getSongById(song_id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM songs WHERE song_id = ?";
    db.get(sql, [song_id], (err, row) => {
      if (err) return reject(err);
      else {
        console.log("Song received: ", row);
        return resolve(row);
      }
    });
  });
}

//Get songs with optional filters, null if filter is not applied
async function getSongs(author, genre, album) {
  //Adding parameters if filter applied
  let query = "SELECT * FROM songs WHERE 1=1";
  const params = [];

  if (author) {
    query += " AND author_id = ?";
    params.push(author);
  }

  if (genre) {
    query += " AND genre_id = ?";
    params.push(genre);
  }

  if (album) {
    query += " AND album_id = ?";
    params.push(album);
  }

  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = { createSong, getSongById, getSongs };
