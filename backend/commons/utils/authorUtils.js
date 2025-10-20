const { initDB } = require("../../db/database.js");
const db = initDB();

async function GetAuthorByName(authorName) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM authors WHERE name = ?";
    db.get(sql, [authorName], (err, row) => {
      if (err) {
        return reject({ code: "DB_ERROR", message: err.message });
      }
      if (!row) {
        return reject({ code: "NOT_FOUND", message: "Author not found" });
      }
      resolve(row);
    });
  });
}

module.exports = { GetAuthorByName };
