const makeResponse = require("../../commons/models/response.js");
const { getSongs, searchSongs, countSongs } = require("./songRepository.js");

async function GetSongsController(req, res) {
  try {
    const { author, genre, album } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit);
    if (limit) {
      const offset = (page - 1) * limit;
    }
    const songs = await getSongs(author, genre, album, limit, offset);

    const count = countSongs(author, genre, album);

    const totalPages = Math.ceil(count / limit);

    res.status(200).json(
      makeResponse(
        true,
        "Songs retrieved succesfully",
        {
          songs,
          pagination: {
            page,
            limit,
            totalPages,
            totalItems: count,
          },
        },
        200
      )
    );
  } catch (error) {
    res
      .status(500)
      .json(makeResponse(false, "Error retrieving songs", error.message, 500));
  }
}

async function SearchSongController(req, res) {
  try {
    let { q } = req.query;
    let { limit } = req.query;

    const songs = await searchSongs(q, limit);

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
