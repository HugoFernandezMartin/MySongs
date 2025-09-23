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

//!DEBUG
const path = require("path");

async function resetDB(DB) {
  await db.run("DELETE FROM users");
  await db.run("DELETE FROM songs");
  await db.run("DELETE FROM albums");
  await db.run("DELETE FROM authors");
  await db.run("DELETE FROM liked_songs");
  await db.run("DELETE FROM playlists");
  await db.run("DELETE FROM songs_playlists");
  await db.run("DELETE FROM sqlite_sequence");
  console.log("DEBUG: DB reseted");
}

module.exports = { initDB, resetDB };
