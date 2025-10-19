const makeResponse = require("../commons/models/response.js");
const {
  getSongs,
  searchSongs,
  countSongs,
} = require("../repositories/songRepository.js");

async function GetSongsController(
  author_id,
  genre_id,
  album_id,
  currentPage,
  limit
) {
  const offset = (currentPage - 1) * limit;

  const songs = await getSongs(author_id, genre_id, album_id, limit, offset);
  const count = await countSongs(author_id, genre_id, album_id);
  const totalPages = Math.ceil(count / limit);
  return {
    songs,
    pagination: {
      currentPage,
      limit,
      totalPages,
      totalItems: count,
      prevPage: currentPage - 1,
      nextPage: currentPage + 1,
      hasPrevPage: currentPage > 1,
      hasNextPage: currentPage < totalPages,
    },
  };
}

async function SearchSongController(q, limit) {
  const songs = await searchSongs(q, limit);
  return songs;
}

module.exports = { GetSongsController, SearchSongController };
