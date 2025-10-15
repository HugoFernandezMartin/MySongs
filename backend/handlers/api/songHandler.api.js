const makeResponse = require("../../commons/models/response");
const { SearchSongController } = require("../../controllers/songController");

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

module.exports = { GetSongsSearchHandler };
