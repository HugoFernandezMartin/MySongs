const { initDB } = require("../db/database");
const db = initDB();

async function CreateAuthor(name, description) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO authors (name, description) VALUES (?, ?)`,
      [name, description],
      function (err) {
        if (err) {
          if (err.code === "SQLITE_CONSTRAINT") {
            return reject({
              code: "ALREADY_EXISTS",
              message: "This author already exists",
            });
          } else {
            return reject(err);
          }
        }
        const newID = this.lastID;
        console.log(`Created Author ${name}`);
        resolve(newID);
      }
    );
  });
}

async function DeleteAuthor(author_id) {
  const query = "DELETE FROM authors WHERE author_id = ?";

  return new Promise((resolve, reject) => {
    db.run(query, [author_id], function (err) {
      if (err) {
        return reject({ code: "DB_ERROR", message: err.message });
      }
      if (this.changes === 0) {
        return reject({ code: "NOT_FOUND", message: "Author not found" });
      }
      console.log(`Deleted author with ID ${author_id}`);
      resolve({ deleted: this.changes });
    });
  });
}

module.exports = { CreateAuthor, DeleteAuthor };
