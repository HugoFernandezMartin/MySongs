const makeResponse = require("../commons/models/response");
const {
  AddGenre,
  RemoveGenre,
  GetGenres,
  GetGenreById,
  GetSongsFromGenre,
} = require("../repositories/genreRepository");

async function CreateGenreController(req, res) {
  try {
    //Get data from request
    const { name, description } = req.body;

    //Create Genre
    const genreId = await AddGenre(name, description);
    res
      .status(200)
      .json(makeResponse(true, "Genre created succesfully", genreId, 200));
  } catch (err) {
    res
      .status(500)
      .json(makeResponse(false, "Unable to create genre", err.message, 500));
  }
}

async function DeleteGenreController(req, res) {
  try {
    console.log("TRYTRYTRY");
    //Get data from request
    const { genre_id } = req.params;

    //Delete genre
    await RemoveGenre(genre_id);

    res
      .status(200)
      .json(makeResponse(true, "Genre deleted succesfully", genre_id, 200));
  } catch (err) {
    if (err.code === "NOT_FOUND") {
      res
        .status(401)
        .json(makeResponse(false, "Unable to get resources", err.message, 401));
    }
    res
      .status(500)
      .json(makeResponse(false, "Unable to create genre", err.message, 500));
  }
}

async function GetGenresController(req, res) {
  try {
    const genres = await GetGenres();

    res
      .status(200)
      .json(makeResponse(true, "Genres retrieved succesfully", genres, 200));
  } catch (err) {
    res
      .status(500)
      .json(makeResponse(false, "Unable to get genres", err.message, 500));
  }
}

async function GetGenreByIdController(req, res) {
  try {
    //Get data from request
    const { genre_id } = req.params;

    //Get genres
    const genre = await GetGenreById(genre_id);

    res
      .status(200)
      .json(makeResponse(true, "Genre retrieved succesfully", genre, 200));
  } catch (err) {
    res
      .status(500)
      .json(makeResponse(false, "Unable to get genre", err.message, 500));
  }
}

async function GetSongsFromGenreController(req, res) {
  try {
    //Get data from request
    const { genre_id } = req.params;
    //Check existing genre
    await GetGenreById(genre_id);

    //Get songs from genre
    const songs = GetSongsFromGenre(genre_id);

    res
      .status(200)
      .json(makeResponse(true, "Songs retrieved succesfully", songs, 200));
  } catch (err) {
    if (err.code === "NOT_FOUND") {
      res
        .status(401)
        .json(makeResponse(false, "Unable to get resources", err.message, 401));
    }
    res
      .status(500)
      .json(makeResponse(false, "Unable to get songs", err.message, 500));
  }
}

module.exports = {
  CreateGenreController,
  DeleteGenreController,
  GetGenresController,
  GetGenreByIdController,
  GetSongsFromGenreController,
};
