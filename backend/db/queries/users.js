const { initDB } = require("../database.js");
const db = initDB();

//Create new user
async function create_user(username, email, hashed_password) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`,
      [username, email, hashed_password],
      function (err) {
        if (err) return reject(err);
        console.log(`Created user with ID ${this.lastID}`);
        resolve(this.lastID);
      }
    );
  });
}

//Get user data
async function get_user_data(user_id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE user_id = ?";
    db.get(sql, [user_id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
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
//Check existing email
async function check_email() {
  //TODO
}

module.exports = { create_user, get_user_data };
