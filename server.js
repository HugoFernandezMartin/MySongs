const express = require("express");
const { initDB, resetDB } = require("./backend/db/database.js");
const songsRouter = require("./backend/api/song/songRouter.js");

const port = 8080;
const app = express();

//*Test endpoint
app.get("/", (req, res) => {
  res.send("Hello World");
});

//TODO Routes
app.use("/songs", songsRouter);

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

module.exports = { app, server, db };
