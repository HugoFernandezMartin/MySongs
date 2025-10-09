const sqlite3 = require("sqlite3");
const fs = require("fs");
let db;
exports.db = db;

function initDB() {
  if (db) return db;
  db = new sqlite3.Database("./mysongs.db");
  db.run("PRAGMA foreign_keys = ON;");
  const sql = fs.readFileSync("./backend/db/scripts/init.sql", "utf8");
  db.exec(sql);
  return db;
}

module.exports = { initDB };
