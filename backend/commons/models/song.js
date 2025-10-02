/*
    Global type for songs.
  Song:
    {
      title: string,
      author_id: number,
      genre_id: number,
      album_id: number,
      release_date: string, (format YYYY-MM-DD)
    }

  Example Song:
    {
      title: "Dust N' Bones"
      author_id: 2,
      genre_id: 3,
      album_id: 1,
      release_date: "1991-09-17"
    }


*/
function makeSong(title, author_id, genre_id, album_id, release_date) {
  return {
    title,
    author_id,
    genre_id,
    album_id,
    release_date,
  };
}

module.exports = makeSong;
