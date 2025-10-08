const { initDB, resetDB } = require("../db/database");
const db = initDB();

const {
  getUsers,
  updatePassword,
  deleteUser,
} = require("../api/user/userRepository.js");
const { getUserByName } = require("../commons/utils/userUtils.js");
const { createSong, getSongs } = require("../api/song/songRepository.js");
const { getSongById } = require("../commons/utils/songUtils.js");
const { registerUser } = require("../api/auth/authRepository.js");
const {
  AddPlaylist,
  getPlaylistById,
  DeletePlaylist,
  AddSongToPlaylist,
  getSongsFromPlaylist,
  DeleteSongFromPlaylist,
} = require("../api/playlist/playlistRepository.js");
const {
  AddGenre,
  GetGenreById,
  RemoveGenre,
} = require("../api/genre/genreRepository.js");

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
      const changes = await updatePassword(id, "1234_newHash");
      expect(changes).toEqual({ deleted: 1 });
    });

    test("Register new user and delete its account", async () => {
      const id = await registerUser("huguito", "1234_hash");
      const changes = await deleteUser(id);
      expect(changes).toEqual({ deleted: 1 });
    });
  });

  describe("Song management tests", () => {
    test("Create new song and check if created", async () => {
      const id = await createSong("La Salvacion", 5, 1, null, "2025-12-02");
      const song = await getSongById(id);
      expect(song.title).toBe("La Salvacion");
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

  describe("Playlist management tests", () => {
    test("Create new playlist and check if created: ", async () => {
      const playlistId = await AddPlaylist("Hike 2025", 1);
      const playlistData = await getPlaylistById(playlistId);
      expect(playlistData.title).toBe("Hike 2025");
    });

    test("Delete new playlist and check if erased", async () => {
      const playlistId = await DeletePlaylist(1);

      try {
        await getPlaylistById(playlistId);
      } catch (err) {
        if (err.code === "NOT_FOUND") return;
      }
      throw new Error("Playlist was not deleted correctly");
    });

    test("Add song to playlist and check if added: ", async () => {
      //*ADD SONG 4 TO PLAYLIST 1
      await AddSongToPlaylist(1, 4);
      const songs = await getSongsFromPlaylist(1);
      const song = await getSongById(4);
      expect(songs).toContainEqual(song);
    });

    test("Remove song from playlist and check if removed: ", async () => {
      //*REMOVE SONG 2 FROM PLAYLIST 1
      await DeleteSongFromPlaylist(1, 2);
      const songs = await getSongsFromPlaylist(1);
      const song = await getSongById(2);
      expect(songs).not.toContainEqual(song);
    });
  });

  describe("Genre management tests", () => {
    test("Create a gender and check if created", async () => {
      const id = await AddGenre("Rap", "Just Rap");
      const genre = await GetGenreById(id);
      expect(genre).toEqual({
        genre_id: id,
        name: "Rap",
        description: "Just Rap",
      });
    });

    test("Delete a gender and check if deleted", async () => {
      const genreId = await RemoveGenre(1);

      try {
        await GetGenreById(genreId);
      } catch (err) {
        if (err.code === "NOT_FOUND") return;
      }
      throw new Error("Genre was not deleted correctly");
    });
  });
});
