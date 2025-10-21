const fs = require("fs");
const { initDB } = require("../db/database");
const { getUserByName } = require("../commons/utils/userUtils");
const { hashPassword } = require("../commons/utils/hash");
const { createUser } = require("../repositories/userRepository");
const db = initDB();

async function ensureAdminExists() {
  try {
    await getUserByName("admin");
  } catch (err) {
    const password_hash = await hashPassword("wdf#2025");
    await createUser("admin", password_hash, true);
  }
}

async function resetDB() {
  if (!db) await initDB();

  return new Promise((resolve, reject) => {
    db.serialize(async () => {
      try {
        db.run("DELETE FROM songs_playlists");
        db.run("DELETE FROM playlists");
        db.run("DELETE FROM users");
        db.run("DELETE FROM songs");
        db.run("DELETE FROM albums");
        db.run("DELETE FROM authors");
        db.run("DELETE FROM genres");
        db.run("DELETE FROM sqlite_sequence");

        const sql = fs.readFileSync(
          "./backend/db/scripts/initial_data.sql",
          "utf8"
        );

        db.exec(sql, async (err) => {
          if (err) return reject(err);
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  });
}

module.exports = { ensureAdminExists, resetDB };
