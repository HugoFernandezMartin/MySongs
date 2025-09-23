import sqlite3 from "sqlite3";

export async function initDB() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("./mysongs.db", (err) => {
      if (err) {
        console.error("Unable to open db", err.message);
        reject(err);
      } else {
        console.log("Connected to MySongs Database");
        resolve(db);
      }
    });
  });
}
