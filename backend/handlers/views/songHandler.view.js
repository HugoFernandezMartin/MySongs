const { SearchSongController } = require("../../controllers/songController");

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

module.exports = { GetSongSearchHandler, GetSongSearchHandler };
