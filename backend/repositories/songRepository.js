const { initDB } = require("../db/database.js");
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

//Get songs with optional filters, null if filter is not applied
async function getSongs(author, genre, album, limit, offset) {
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

  if (limit) {
    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);
  }

  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function searchSongs(q, limit) {
  let query = `SELECT 
        s.song_id,
        s.title AS song_title,
        a.name AS author_name,
        g.name AS genre_name,
        al.title AS album_title,
        s.release_date
      FROM songs s
      JOIN songs_playlists sp ON s.song_id = sp.song_id
      JOIN authors a ON s.author_id = a.author_id
      JOIN genres g ON s.genre_id = g.genre_id
      LEFT JOIN albums al ON s.album_id = al.album_id`;
  const params = [];

  if (q) {
    query += " WHERE song_title LIKE ?";
    params.push(`${q}%`);
  }

  if (limit) {
    query += " LIMIT ?";
    params.push(limit);
  }

  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      console.log("Search result: ", rows);
      if (err) reject(err);
      if (!rows || rows.length === 0) {
        return reject({ code: "NOT_FOUND", message: "No songs found" });
      } else resolve(rows);
    });
  });
}

async function countSongs(author, genre, album) {
  //Adding parameters if filter applied
  let query = "SELECT COUNT(*) as count FROM songs WHERE 1=1";
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
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(parseInt(row.count, 10));
    });
  });
}

module.exports = { createSong, getSongs, searchSongs, countSongs };
