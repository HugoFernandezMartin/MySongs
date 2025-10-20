const {
  CreateGenreController,
  DeleteGenreController,
} = require("../../controllers/genreController");
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

async function CreateGenreHandler(req, res) {
  try {
    const { name, description } = req.body;
    const genre_id = await CreateGenreController(name, description);

    model = { info: `Created genre with Id: ${genre_id}` };
    res.render("admin", model);
  } catch (err) {
    console.log("CreateGenderHandlerError: ", err.message);
    model = { error: err.message };
    res.render("admin", model);
  }
}

async function DeleteGenreHandler(req, res) {
  try {
    const { name } = req.body;
    await DeleteGenreController(name, null);

    model = { info: "Genre deleted successfully" };
    res.render("admin", model);
  } catch (err) {
    console.log("DeleteGenreHandlerError: ", err.message);
    model = { error: err.message };
    res.render("admin", model);
  }
}

module.exports = { GetGenreHandler, CreateGenreHandler, DeleteGenreHandler };
