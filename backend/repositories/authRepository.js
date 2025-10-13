const { initDB } = require("../db/database.js");
const db = initDB();

// Register new user
async function registerUser(username, hashed_password) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (username, password_hash, is_admin) VALUES (?, ?, false)`,
      [username, hashed_password],
      function (err) {
        if (err) {
          if (err.code === "SQLITE_CONSTRAINT") {
            return reject({
              code: "USERNAME_TAKEN",
              message: "This username is already taken",
            });
          }
          return reject({ code: "DB_ERROR", message: err.message });
        }

        const newID = this.lastID;
        console.log(`Created user ${username} with ID ${newID}`);
        resolve(newID);
      }
    );
  });
}

module.exports = { registerUser };
