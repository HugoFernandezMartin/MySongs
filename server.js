const app = require("./app");
const { hashPassword } = require("./backend/api/auth/authService.js");
const { createUser } = require("./backend/api/user/userRepository.js");
const { initDB } = require("./backend/db/database.js");
const { resetDB } = require("./backend/tests/testUtils.js");

// define the port
const port = 8080;

// variables and constants
let server;
let db;

async function start_server() {
  //Try to init database
  try {
    db = initDB();
    await resetDB(); //FIXME Debug
    (async () => {
      const password_hash = await hashPassword("wdf#2025");
      await createUser("admin", password_hash, true);
    })();
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
