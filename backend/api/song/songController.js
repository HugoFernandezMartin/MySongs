const makeResponse = require("../../commons/response");
const { createSong, getSongById, getSongs } = require("./songRepository.js");

async function getSongsController(req, res) {
  try {
    const { author, genre, album } = req.query;
    const songs = await getSongs(author, genre, album);
    res
      .status(200)
      .json(makeResponse(true, "Songs retrieved succesfully", songs, 200));
  } catch (error) {
    res
      .status(500)
      .json(makeResponse(false, "Error retrieving songs", error.message, 500));
  }
}

module.exports = getSongsController;
