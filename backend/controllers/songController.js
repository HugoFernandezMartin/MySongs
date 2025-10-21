const { GetAlbumByName } = require("../commons/utils/albumUtils.js");
const { GetAuthorByName } = require("../commons/utils/authorUtils.js");
const { GetGenreByName } = require("../commons/utils/genreUtils.js");
const { getSongByTitle } = require("../commons/utils/songUtils.js");
const {
  getSongs,
  searchSongs,
  countSongs,
  createSong,
  deleteSong,
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

async function CreateSongController(title, author, genre, album, release_date) {
  if (!title || !author || !genre || !release_date) {
    throw new Error("Missing data for creating song");
  }

  //Check valid release date
  const releaseDate = new Date(release_date);
  const now = new Date();

  if (isNaN(releaseDate.getTime())) {
    throw new Error("Invalid release date format");
  }

  if (releaseDate > now) {
    throw new Error("Not valid date");
  }

  //Get ids
  const authorData = await GetAuthorByName(author);
  const genreData = await GetGenreByName(genre);
  const albumData = await GetAlbumByName(album);

  const songId = await createSong(
    title,
    authorData.author_id,
    genreData.genre_id,
    albumData.album_id,
    release_date
  );
  return songId;
}

async function DeleteSongController(title) {
  if (!title.trim()) {
    throw new Error("Missing data for deleting song");
  }
  const songData = await getSongByTitle(title);
  await deleteSong(songData.song_id);
}

module.exports = {
  GetSongsController,
  SearchSongController,
  CreateSongController,
  DeleteSongController,
};
