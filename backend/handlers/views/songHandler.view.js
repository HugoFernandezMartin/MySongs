const {
  SearchSongController,
  CreateSongController,
  DeleteSongController,
} = require("../../controllers/songController");

async function GetSongSearchHandler(req, res) {
  try {
    const { query } = req.query;
    const songs = await SearchSongController(query);
    model = { songs };
    res.render("songsSearch", model);
  } catch (err) {
    if (err.code === "NOT_FOUND") {
      model = { error: err.message };
      res.render("songsSearch", model);
    }
    console.log("PostSongSearchHandler error: ", err.message);
    model = { error: err.message };
    res.render("songsSearch", model);
  }
}

async function CreateSongHandler(req, res) {
  try {
    const { title, author, genre, album, release_date } = req.body;
    const songId = await CreateSongController(
      title,
      author,
      genre,
      album,
      release_date
    );
    model = { info: `Song created successfully with ID: ${songId}` };
    res.render("admin", model);
  } catch (err) {
    console.log("CreateSongHandlerError: ", err.message);
    model = { error: err.message };
    res.render("admin", model);
  }
}

async function DeleteSongHandler(req, res) {
  try {
    const { title } = req.body;
    await DeleteSongController(title);
    model = { info: "Song deleted successfully" };
    res.render("admin", model);
  } catch (err) {
    console.log("DeleteSongHandlerError: ", err.message);
    model = { error: err.message };
    res.render("admin", model);
  }
}

module.exports = { GetSongSearchHandler, CreateSongHandler, DeleteSongHandler };
