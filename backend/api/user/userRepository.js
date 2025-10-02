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
        console.log(`Created user with ID ${newID}`);
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

//Get user data by id
async function getUserById(user_id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE user_id = ?";
    db.get(sql, [user_id], (err, row) => {
      if (err) return reject(err);
      else return resolve(row);
    });
  });
}

//Delete user
async function delete_user() {
  //TODO
}
//?Update password

//Update username
async function update_username() {
  //TODO
}
//Update profile picture
async function update_profile_picture() {
  //TODO
}

module.exports = { createUser, getUsers, getUserById };
