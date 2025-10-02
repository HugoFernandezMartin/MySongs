const { initDB, resetDB } = require("../db/database");
const db = initDB();

const {
  getUsers,
  updatePassword,
  deleteUser,
} = require("../api/user/userRepository.js");
const { getUserByName } = require("../commons/utils/userUtils.js");
const {
  createSong,
  getSongById,
  getSongs,
} = require("../api/song/songRepository.js");

const { registerUser } = require("../api/auth/authRepository.js");

describe("Database tests", () => {
  beforeEach(async () => {
    await resetDB();
  });

  describe("User management tests", () => {
    test("List all users", async () => {
      const users = await getUsers();
      expect(users).toEqual([
        {
          user_id: 1,
          username: "hugo_dev",
          password_hash: "hash123",
          is_admin: 0,
          profile_picture: "avatars/hugo.png",
        },
        {
          user_id: 2,
          username: "maria98",
          password_hash: "hash456",
          is_admin: 0,
          profile_picture: "avatars/maria.jpg",
        },
        {
          user_id: 3,
          username: "coder_john",
          password_hash: "hash789",
          is_admin: 0,
          profile_picture: null,
        },
        {
          user_id: 4,
          username: "sara_music",
          password_hash: "hash321",
          is_admin: 0,
          profile_picture: "avatars/sara.png",
        },
        {
          user_id: 5,
          username: "alex99",
          password_hash: "hash654",
          is_admin: 0,
          profile_picture: null,
        },
      ]);
    });

    test("Register new user and check if registered", async () => {
      const id = await registerUser("huguito", "1234_hash");
      const user = await getUserByName("huguito");
      expect(user).toEqual({
        user_id: id,
        username: "huguito",
        password_hash: "1234_hash",
        profile_picture: null,
        is_admin: 0,
      });
    });

    test("Register new user and update its password", async () => {
      const id = await registerUser("huguito", "1234_hash");
      const changes = await updatePassword("huguito", "1234_newHash");
      expect(changes).toEqual({ deleted: 1 });
    });

    test("Register new user and delete its account", async () => {
      const id = await registerUser("huguito", "1234_hash");
      const changes = await deleteUser("huguito");
      expect(changes).toEqual({ deleted: 1 });
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
