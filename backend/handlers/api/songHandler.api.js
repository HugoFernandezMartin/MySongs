const makeResponse = require("../../commons/models/response");
const {
  SearchSongController,
  GetSongsController,
} = require("../../controllers/songController");

async function GetSongsSearchHandler(req, res) {
  try {
    const { query } = req.query;
    const songs = await SearchSongController(query);
    res
      .status(200)
      .json(makeResponse(true, "Songs retrieved succesfully", songs, 200));
  } catch (err) {
    console.log("GetSongsSearchHandler error: ", err.message);
    res
      .status(500)
      .json(makeResponse(true, "Unable to retrieve songs", err.message, 200));
  }
}

async function GetSongsHandler(req, res) {
  try {
    const { author_id, genre_id, album_id } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const songs = await GetSongsController(
      author_id,
      genre_id,
      album_id,
      page,
      limit
    );

    res
      .status(200)
      .json(makeResponse(true, "Songs retrieved succesfully", songs, 200));
  } catch (err) {
    console.log("GetSongsHandler Error: ", err.message);
    res
      .status(500)
      .json(makeResponse(false, "Error retrieving songs", err.message, 500));
  }
}

module.exports = { GetSongsSearchHandler, GetSongsHandler };
