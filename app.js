const express = require("express");
const songsRouter = require("./backend/api/song/songRouter.js");
const userRouter = require("./backend/api/user/userRouter.js");
const authRouter = require("./backend/api/auth/authRouter.js");
const accountRouter = require("./backend/api/account/accountRouter.js");
const playlistRouter = require("./backend/api/playlist/playlistRouter.js");
const genreRouter = require("./backend/api/genre/genreRouter.js");
const app = express();
const connectSqlite3 = require("connect-sqlite3");
const session = require("express-session");

//*Test endpoint
app.get("/", (req, res) => {
  res.send("Hello World");
});

//Session database
const SQLiteStore = connectSqlite3(session); // store sessions in the database

//--- DEFINE THE SESSION
app.use(
  session({
    // define the session
    store: new SQLiteStore({
      db: "sessions.db",
      ttl: 24 * 60 * 60, //Sessions expire in 24 hours
      cleanupInterval: 5 * 60, //Expired sessions dissapear every 5 minutes
    }),
    saveUninitialized: false,
    resave: false,
    secret: "This123Is@Another#456GreatSecret678%Sentence",
  })
);
//--- STORE THE SESSION INTO A SQLite3 FILE

// it makes the session information available in ALL handlebar files at once!
app.use((request, response, next) => {
  response.locals.session = request.session;
  next();
});

//Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TODO Routes
app.use("/songs", songsRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/me", accountRouter);
app.use("/playlists", playlistRouter);
app.use("/genres", genreRouter);

module.exports = app;
