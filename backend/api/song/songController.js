const makeResponse = require("../../commons/models/response.js");
const { getSongs, searchSongs } = require("./songRepository.js");

async function GetSongsController(req, res) {
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

async function SearchSongController(req, res) {
  try {
    const { q } = req.query;

    let songs;
    if (!q || q.trim() === "") {
      songs = await getSongs();
    } else {
      songs = await searchSongs(q);
    }

    res
      .status(200)
      .json(makeResponse(true, "Songs retrieved succesfully", songs, 200));
  } catch (error) {
    res
      .status(500)
      .json(makeResponse(false, "Error retrieving songs", error.message, 500));
  }
}
module.exports = { GetSongsController, SearchSongController };
