const express = require("express");

const app = express();
const { engine } = require("express-handlebars");
const connectSqlite3 = require("connect-sqlite3");
const session = require("express-session");

//API Routers
const songsRouterApi = require("./backend/routes/api/songRouter.api.js");
const userRouterApi = require("./backend/routes/api/userRouter.api.js");
const authRouterApi = require("./backend/routes/api/authRouter.api.js");
const accountRouterApi = require("./backend/routes/api/accountRouter.api.js");
const playlistRouterApi = require("./backend/routes/api/playlistRouter.api.js");
const genreRouterApi = require("./backend/routes/api/genreRouter.api.js");

//Views Routers
const accountRouterView = require("./backend/routes/views/accountRouter.view.js");
const authRouterView = require("./backend/routes/views/authRouter.view.js");
const playlistRouterView = require("./backend/routes/views/playlistRouter.view.js");
const songRouterView = require("./backend/routes/views/songRouter.view.js");
const genreRouterView = require("./backend/routes/views/genreRouter.view.js");
const { GetGenres } = require("./backend/repositories/genreRepository.js");

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

//*Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

//Main Page
app.get("/", async (req, res) => {
  const genres = await GetGenres();
  const model = { genres };
  res.render("home", model);
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/about", (req, res) => {
  res.render("about");
});

//*API Routes
app.use("/api/songs", songsRouterApi);
app.use("/api/users", userRouterApi);
app.use("/api/auth", authRouterApi);
app.use("/api/me", accountRouterApi);
app.use("/api/playlists", playlistRouterApi);
app.use("/api/genres", genreRouterApi);

//*Views Routes
app.use("/me", accountRouterView);
app.use("/auth", authRouterView);
app.use("/playlists", playlistRouterView);
app.use("/songs", songRouterView);
app.use("/genres", genreRouterView);

module.exports = app;
