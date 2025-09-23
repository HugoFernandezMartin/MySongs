import sqlite3 from "sqlite3";
import fs from "fs";

export function initDB() {
  //Open db file
  const db = new sqlite3.Database("./mysongs.db");

  //Enable FKs
  db.run("PRAGMA foreign_keys = ON;");

  //Execute init script
  const sql = fs.readFileSync("./backend/db/scripts/init.sql", "utf8");

  db.exec(sql);
}
