/*
Hugo Fernández Martín - fehu25cr@student.ju.se
Angelica Salazar Strelschenko - saan24fr@student.ju.se

Target grade 5

Project Web Dev Fun 2025

Administrator login: admin
Administrator password: wdf#2025 -> $2b$10$x57IbwN2W0Ua1MiSzCstQuwkBCo0h.x.0Il1zlQGb5zs0Ho2YCf0m

- Some code in this projecto were generated with the help of ChatGPT.
- Several images come from the web (not made by us): pinterest, google images.

*/
const app = require("./app");
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

    //Testing

    /*await resetDB();
    (async () => {
      const password_hash = await hashPassword("wdf#2025");
      await createUser("admin", password_hash, true);
    })();*/

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
