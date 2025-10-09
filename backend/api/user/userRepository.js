const { initDB } = require("../../db/database.js");
const db = initDB();

//Create new user
async function createUser(username, hashed_password, isAdmin) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (username, password_hash, is_admin) VALUES (?, ?, ?)`,
      [username, hashed_password, isAdmin],
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

async function deleteUser(userId) {
  const query = "DELETE FROM users WHERE user_id = ?";

  return new Promise((resolve, reject) => {
    db.run(query, [userId], function (err) {
      if (err) {
        return reject({ code: "DB_ERROR", message: err.message });
      }
      if (this.changes === 0) {
        return reject({ code: "NOT_FOUND", message: "User not found" });
      }
      console.log(`Deleted user with ID ${userId}`);
      resolve({ deleted: this.changes });
    });
  });
}

//Update password
async function updatePassword(userId, newPasswordHash) {
  const query = "UPDATE users SET password_hash = ? WHERE user_id = ?";

  return new Promise((resolve, reject) => {
    db.run(query, [newPasswordHash, userId], function (err) {
      if (err) {
        return reject({ code: "DB_ERROR", message: err.message });
      }
      if (this.changes === 0) {
        return reject({ code: "NOT_FOUND", message: "User not found" });
      }
      console.log(`Change password from username with ID ${userId}`);
      resolve({ deleted: this.changes });
    });
  });
}

//Update profile picture
async function update_profile_picture() {
  //TODO
}

module.exports = { createUser, getUsers, deleteUser, updatePassword };
