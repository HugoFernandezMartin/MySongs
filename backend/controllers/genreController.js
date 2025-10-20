const makeResponse = require("../commons/models/response");
const { GetGenreById, GetGenreByName } = require("../commons/utils/genreUtils");
const {
  AddGenre,
  RemoveGenre,
  GetGenres,
  GetSongsFromGenre,
} = require("../repositories/genreRepository");

async function CreateGenreController(name, description) {
  if (!name || !description) {
    throw new Error("Missing data for creating genre");
  }
  const genre_id = await AddGenre(name, description);

  return genre_id;
}

async function DeleteGenreController(genreName, genreId) {
  if (!genreId) {
    if (!genreName) {
      throw new Error("Missing data for deleting genre");
    } else {
      const genreData = await GetGenreByName(genreName);
      genreId = genreData.genre_id;
    }
  }

  //Delete genre
  await RemoveGenre(genreId);
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
