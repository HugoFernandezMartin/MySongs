const bcrypt = require("bcrypt");

function hashPassword(password) {
  const saltRounds = 10;
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hashed) => {
      if (err) return reject({ code: "HASH_ERROR", message: err.message });
      resolve(hashed);
    });
  });
}

function verifyPassword(password, hashedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) {
        return reject({ code: "HASH_ERROR", message: err.message });
      }
      if (!result) {
        return reject({
          code: "INVALID_PASSWORD",
          message: "Incorrect password",
        });
      }
      resolve(true);
    });
  });
}

module.exports = { hashPassword, verifyPassword };
