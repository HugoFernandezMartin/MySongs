const { initDB } = require("../../db/database.js");
const db = initDB();

//Register new user
async function registerUser(username, hashed_password) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (username, password_hash, is_admin) VALUES (?, ?, false)`,
      [username, hashed_password],
      function (err) {
        if (err) return reject({ code: "DB_ERROR", message: err.message });
        const newID = this.lastID;
        console.log(`Created user with ID ${newID}`);
        resolve(newID);
      }
    );
  });
}

//Get user data by email
async function getUserByName(username) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE username = ?";
    db.get(sql, [username], (err, row) => {
      if (err) {
        return reject({ code: "DB_ERROR", message: err.message });
      }
      if (!row) {
        return reject({ code: "NOT_FOUND", message: "User not found" });
      }
      resolve(row);
    });
  });
}

module.exports = { registerUser, getUserByName };
