const { initDB } = require("../../db/database.js");
const db = initDB();

//Create new user
async function createUser(username, hashed_password) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (username, password_hash, is_admin) VALUES (?, ?, false)`,
      [username, hashed_password],
      function (err) {
        if (err) return reject(err);
        const newID = this.lastID;
        console.log(`Created user ${username}`);
        resolve(newID);
      }
    );
  });
}

//Get all users
async function getUsers() {
  let query = "SELECT * FROM users";

  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function deleteUser(username) {
  const query = "DELETE FROM users WHERE username = ?";

  return new Promise((resolve, reject) => {
    db.run(query, [username], function (err) {
      if (err) {
        return reject({ code: "DB_ERROR", message: err.message });
      }
      if (this.changes === 0) {
        return reject({ code: "NOT_FOUND", message: "User not found" });
      }
      console.log(`Deleted user with username ${username}`);
      resolve({ deleted: this.changes });
    });
  });
}

//Update password
async function updatePassword(username, newPasswordHash) {
  const query = "UPDATE users SET password_hash = ? WHERE username = ?";

  return new Promise((resolve, reject) => {
    db.run(query, [newPasswordHash, username], function (err) {
      if (err) {
        return reject({ code: "DB_ERROR", message: err.message });
      }
      if (this.changes === 0) {
        return reject({ code: "NOT_FOUND", message: "User not found" });
      }
      console.log(`Change password from username ${username}`);
      resolve({ deleted: this.changes });
    });
  });
}

//Update profile picture
async function update_profile_picture() {
  //TODO
}

module.exports = { createUser, getUsers, deleteUser, updatePassword };
