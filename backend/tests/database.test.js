const { initDB, resetDB } = require("../db/database");
const db = initDB();

const { createUser, getUserData } = require("../api/user/userRepository.js");
const {
  createSong,
  getSongById,
  getSongs,
} = require("../api/song/songRepository.js");

describe("Database tests", () => {
  beforeAll(async () => {
    await resetDB();
  });

  describe("User management tests", () => {
    test("Create new user and check if created", async () => {
      const id = await createUser("huguito", "huguito@gmail.com", "1234_hash");
      const user = await getUserData(id);
      console.log("User:", user);
      expect(user).toEqual({
        user_id: id,
        username: "huguito",
        email: "huguito@gmail.com",
        password_hash: "1234_hash",
        profile_picture: null,
      });
    });
  });

  describe("Song management tests", () => {
    test("Create new song and check if created", async () => {
      const id = await createSong("La Salvacion", 5, 1, null, "2025-12-02");
      const song = await getSongById(id);
      expect(song).toEqual({
        song_id: id,
        title: "La Salvacion",
        author_id: 5,
        genre_id: 1,
        album_id: null,
        release_date: "2025-12-02",
      });
    });

    test("Get all songs filtered by author", async () => {
      const author_id = 1;
      const songs = await getSongs(author_id, null, null);
      expect(songs).toEqual([
        {
          song_id: 1,
          title: "Starlight Drive",
          author_id: 1,
          genre_id: 3,
          album_id: 1,
          release_date: "2022-05-10",
        },
      ]);
    });
  });
});
