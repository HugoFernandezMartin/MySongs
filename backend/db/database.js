const sqlite3 = require("sqlite3");
const fs = require("fs");
let db;

function initDB() {
  if (db) return db;
  db = new sqlite3.Database("./mysongs.db");
  db.run("PRAGMA foreign_keys = ON;");
  const sql = fs.readFileSync("./backend/db/scripts/init.sql", "utf8");
  db.exec(sql);
  return db;
}

async function resetDB() {
  if (!db) initDB();

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("DELETE FROM songs_playlists");
      db.run("DELETE FROM playlists");
      db.run("DELETE FROM users");
      db.run("DELETE FROM songs");
      db.run("DELETE FROM albums");
      db.run("DELETE FROM authors");
      db.run("DELETE FROM genres");
      db.run("DELETE FROM sqlite_sequence");

      const sql = fs.readFileSync("./backend/db/scripts/test_data.sql", "utf8");
      db.exec(sql, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
}

module.exports = { initDB, resetDB };
