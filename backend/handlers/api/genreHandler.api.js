const makeResponse = require("../../commons/models/response");
const {
  CreateGenreController,
  DeleteGenreController,
} = require("../../controllers/genreController");

async function CreateGenreHandler(req, res) {
  try {
    //Get data from request
    const { name, description } = req.body;

    //Create Genre
    const genreId = await CreateGenreController(name, description);

    res
      .status(200)
      .json(makeResponse(true, "Genre created succesfully", genreId, 200));
  } catch (err) {
    console.log("CreateGenreHandlerError: ", err.message);
    res
      .status(500)
      .json(makeResponse(false, "Unable to create genre", err.message, 500));
  }
}

async function DeleteGenreHandler(req, res) {
  try {
    //Get data from request
    const { genre_id } = req.params;

    await DeleteGenreController(null, genre_id);

    res
      .status(200)
      .json(makeResponse(true, "Genre deleted succesfully", genre_id, 200));
  } catch (err) {
    if (err.code === "NOT_FOUND") {
      res
        .status(404)
        .json(makeResponse(false, "Unable to get resources", err.message, 401));
    }
    res
      .status(500)
      .json(makeResponse(false, "Unable to create genre", err.message, 500));
  }
}
module.exports = { CreateGenreHandler, DeleteGenreHandler };
