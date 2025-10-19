const { GetSongsController } = require("../../controllers/songController");
const { GetGenreById } = require("../../repositories/genreRepository");

async function GetGenreHandler(req, res) {
  try {
    const { genre_id } = req.params;
    const genreData = await GetGenreById(genre_id);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const { songs, pagination } = await GetSongsController(
      null,
      genre_id,
      null,
      page,
      limit
    );
    model = { genre: genreData, songs, pagination };
    res.render("genre", model);
  } catch (err) {
    console.log("GetGenreHandler Error: ", err.message);
    model = { error: err.message };
    res.render("genre", model);
  }
}

module.exports = { GetGenreHandler };
