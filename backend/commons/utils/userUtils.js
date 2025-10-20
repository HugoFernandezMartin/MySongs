const { initDB } = require("../../db/database.js");
const db = initDB();

//Get user data by name
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

//Get user data by id
async function getUserById(user_id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE user_id = ?";
    db.get(sql, [user_id], (err, row) => {
      if (err) return reject(err);
      if (!row) {
        return reject({ code: "NOT_FOUND", message: "User not found" });
      } else return resolve(row);
    });
  });
}

module.exports = { getUserByName, getUserById };
