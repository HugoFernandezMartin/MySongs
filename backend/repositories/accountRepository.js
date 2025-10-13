const { initDB } = require("../db/database.js");
const db = initDB();

async function GetPlaylists(user_id) {
  const query = "SELECT * FROM playlists WHERE owner_id = ?";
  return new Promise((resolve, reject) => {
    db.all(query, [user_id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function UpdatePicture(pictureRoute, userId) {
  const query = "UPDATE users SET profile_picture = ? WHERE user_id = ?";

  return new Promise((resolve, reject) => {
    db.run(query, [pictureRoute, userId], function (err) {
      if (err) {
        return reject({ code: "DB_ERROR", message: err.message });
      }
      if (this.changes === 0) {
        return reject({ code: "NOT_FOUND", message: "User not found" });
      }
      console.log(`Change picture from username with ID ${userId}`);
      resolve({ deleted: this.changes });
    });
  });
}

module.exports = { GetPlaylists, UpdatePicture };
