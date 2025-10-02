const app = require("./app");
const { initDB, resetDB } = require("./backend/db/database.js");

const port = 8080;

let server;
let db;

async function start_server() {
  //Try to init database
  try {
    db = initDB();
    await resetDB(); //!Debug
    console.log("Conected to MySongs database");
  } catch (err) {
    console.error("Unable to start server, DB failed: ", err.message);
    process.exit(1);
  }

  //Init server
  server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

start_server();
