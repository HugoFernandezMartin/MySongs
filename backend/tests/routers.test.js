const app = require("../../app.js");
const request = require("supertest");
const { resetDB, ensureAdminExists } = require("./testUtils.js");

describe("Routers tests", () => {
  beforeEach(async () => {
    await resetDB();
  });

  describe("Middleware tests: ", () => {
    beforeAll(async () => {
      console.log(
        "------------------------\n------MIDDLEWARE--------\n------------------------"
      );
    });

    test("Try to log out without log in first", async () => {
      const response = await request(app).get("/auth/logout");
      console.log("LOGOUT RESPONSE: ", response.body);
      expect(response.body.message).toBe("You must log in");
    });

    test("Try to create a genre without being admin", async () => {
      await ensureAdminExists();
      const agent = request.agent(app);

      //*REGISTER
      await agent.post("/auth/register").send({
        username: "angelica123",
        password: "pass123",
      });

      //*LOGIN
      await agent.post("/auth/login").send({
        username: "angelica123",
        password: "pass123",
      });

      //*Create a genre
      const response = await agent.post(`/genres`).send({
        name: "RAP",
        description: "JUST RAP",
      });

      expect(response.body.message).toBe("Authentication Error");
    });
  });

  describe("User Routes tests: ", () => {
    beforeAll(async () => {
      console.log(
        "------------------------\n---------USER-----------\n------------------------"
      );
    });
    beforeEach(async () => {
      await resetDB();
    });

    test("Get all users: ", async () => {
      const response = await request(app).get("/users");
      console.log("RESPONSE: ", response.body);
      expect(response.body.message).toBe("Users retrieved succesfully");
    });

    test("Get a user by Id: ", async () => {
      const response = await request(app).get("/users/1");
      console.log("RESPONSE: ", response.body);
      expect(response.body.message).toBe("User retrieved succesfully");
    });

    test("Create a new user: ", async () => {
      //*Admin log in
      await ensureAdminExists();
      const agent = request.agent(app);

      //*LOGIN
      await agent.post("/auth/login").send({
        username: "admin",
        password: "wdf#2025",
      });

      const response = await agent.post("/users").send({
        username: "angelica123",
        password: "pass123",
        isAdmin: false,
      });
      console.log("CREATE NEW USER RESPONSE: ", response.body);
      expect(response.body.message).toBe("User created succesfully");
    });
  });

  describe("Account tests: ", () => {
    beforeAll(async () => {
      console.log(
        "------------------------\n-------ACCOUNT---------\n------------------------"
      );
    });
    test("Register user:", async () => {
      //*REGISTER
      const response = await request(app).post("/auth/register").send({
        username: "angelica123",
        password: "pass123",
      });
      console.log("REGISTER RESPONSE: ", response.body);
      expect(response.body.message).toBe("User registered succesfully");
    });

    test("Register, Log in and log out", async () => {
      const agent = request.agent(app);

      await agent.post("/auth/register").send({
        username: "angelica123",
        password: "pass123",
      });
      //*LOGIN
      response = await agent.post("/auth/login").send({
        username: "angelica123",
        password: "pass123",
      });
      console.log("LOGIN RESPONSE: ", response.body);
      expect(response.body.message).toBe("Login Succesfully");

      //*LOGOUT
      response = await agent.get("/auth/logout");
      console.log("LOGOUT RESPONSE: ", response.body);
      expect(response.body.message).toBe("Logout Succesfully");
    });

    test("Register, log in and delete account", async () => {
      const agent = request.agent(app);

      //*REGISTER
      await agent.post("/auth/register").send({
        username: "angelica123",
        password: "pass123",
      });

      //*LOGIN
      await agent.post("/auth/login").send({
        username: "angelica123",
        password: "pass123",
      });

      //*DELETE ACCOUNT
      const response = await agent.delete("/me/delete").send({
        password: "pass123",
      });
      console.log("DELETE ACCOUNT RESPONSE: ", response.body);
      expect(response.body.message).toBe("Account deleted succesfully");
    });

    test("Register, log in and update password", async () => {
      const agent = request.agent(app);

      //*REGISTER
      await agent.post("/auth/register").send({
        username: "angelica123",
        password: "pass123",
      });

      //*LOGIN
      await agent.post("/auth/login").send({
        username: "angelica123",
        password: "pass123",
      });

      //*UPDATE PASSWORD
      const response = await agent.put("/me/update_password").send({
        password: "pass123",
        newPassword: "newPass123",
      });
      console.log("UPDATE PASSWORD RESPONSE: ", response.body);
      expect(response.body.message).toBe("Password updated succesfully");
    });

    test("Register, log in and retrieve playlist", async () => {
      const agent = request.agent(app);

      //*REGISTER
      await agent.post("/auth/register").send({
        username: "angelica123",
        password: "pass123",
      });

      //*LOGIN
      await agent.post("/auth/login").send({
        username: "angelica123",
        password: "pass123",
      });

      //*RETURN PLAYLISTS
      const response = await agent.get("/me/playlists");
      console.log("GET PLAYLISTS RESPONSE: ", response.body);
      expect(response.body.message).toBe("Playlists retrieved succesfully");
    });

    test("Register, log in and try to update profile picture", async () => {
      const agent = request.agent(app);

      //*REGISTER
      await agent.post("/auth/register").send({
        username: "angelica123",
        password: "pass123",
      });

      //*LOGIN
      await agent.post("/auth/login").send({
        username: "angelica123",
        password: "pass123",
      });

      //*RETURN PLAYLISTS
      const response = await agent.put("/me/update_picture").send({
        picture: "PictureDATA",
      });
      console.log("UPDATE PICTURE RESPONSE: ", response.body);
      expect(response.body.message).toBe("Profile Picture updated succesfully");
    });
  });

  describe("Playlists tests: ", () => {
    beforeAll(async () => {
      console.log(
        "------------------------\n-------PLAYLIST-----------\n------------------------"
      );
    });
    test("Create a new playlist", async () => {
      const agent = request.agent(app);

      //*REGISTER
      await agent.post("/auth/register").send({
        username: "angelica123",
        password: "pass123",
      });

      //*LOGIN
      await agent.post("/auth/login").send({
        username: "angelica123",
        password: "pass123",
      });

      //*CREATE PLAYLIST
      const response = await agent.post("/playlists").send({
        title: "Chill Vibes",
      });
      console.log("CREATE PLAYLIST RESPONSE: ", response.body);
      expect(response.body.message).toBe("Playlist created succesfully");
    });

    test("Create and delete a playlist", async () => {
      const agent = request.agent(app);
      let response;

      //*REGISTER
      await agent.post("/auth/register").send({
        username: "angelica123",
        password: "pass123",
      });

      //*LOGIN
      await agent.post("/auth/login").send({
        username: "angelica123",
        password: "pass123",
      });

      //*CREATE PLAYLIST
      response = await agent.post("/playlists").send({
        title: "Chill Vibes",
      });

      //*DELETE PLAYLIST
      const playlistId = response.body.responseObject;
      const deleteResponse = await agent.delete(`/playlists/${playlistId}`);

      console.log("DELETE PLAYLIST RESPONSE: ", deleteResponse.body);
      expect(deleteResponse.body.message).toBe("Playlist deleted succesfully");
    });

    test("Add a song to playlist", async () => {
      await ensureAdminExists();
      const agent = request.agent(app);

      //*LOGIN
      await agent.post("/auth/login").send({
        username: "admin",
        password: "wdf#2025",
      });

      //*CREATE PLAYLIST
      const cr = await agent.post("/playlists").send({
        title: "Chill Vibes",
      });
      const playlist_id = cr.body.responseObject;

      //*ADD SONG 1 TO PLAYLIST 2
      const route = `/playlists/${playlist_id}/songs`;
      const response = await agent.post(route).send({
        songId: 1,
      });

      console.log("ADD SONG TO PLAYLIST RESPONSE: ", response.body);
      expect(response.body.message).toBe("Song added to playlist succesfully");
    });

    test("Remove a song from a playlist", async () => {
      await ensureAdminExists();
      const agent = request.agent(app);

      //*LOGIN
      await agent.post("/auth/login").send({
        username: "admin",
        password: "wdf#2025",
      });

      //*CREATE PLAYLIST
      const cr = await agent.post("/playlists").send({
        title: "Chill Vibes",
      });
      const playlist_id = cr.body.responseObject;

      //*ADD SONG 1 TO PLAYLIST 2
      const songId = 1;
      const route = `/playlists/${playlist_id}/songs`;
      await agent.post(route).send({
        songId,
      });

      //*REMOVE SONG 1 FROM PLAYLIST 1
      const response = await agent.delete(
        `/playlists/${playlist_id}/songs/${songId}`
      );

      console.log("REMOVE SONG FROM PLAYLIST RESPONSE: ", response.body);
      expect(response.body.message).toBe(
        "Song removed from playlist succesfully"
      );
    });

    test("Get all songs from a playlist", async () => {
      //*GET SONGS FROM PLAYLIST 1
      const response = await request(app).get(`/playlists/1/songs`);

      console.log("GET SONGS FROM PLAYLIST RESPONSE: ", response.body);
      expect(response.body.message).toBe(
        "Songs from playlist retrieved succesfully"
      );
    });
  });

  describe("Genres tests", () => {
    beforeAll(async () => {
      console.log(
        "------------------------\n--------GENRES----------\n------------------------"
      );
    });

    test("Create a genre", async () => {
      await ensureAdminExists();
      const agent = request.agent(app);

      //*LOGIN
      await agent.post("/auth/login").send({
        username: "admin",
        password: "wdf#2025",
      });

      //*Create a genre
      const response = await agent.post(`/genres`).send({
        name: "RAP",
        description: "JUST RAP",
      });

      expect(response.body.message).toBe("Genre created succesfully");
    });

    test("Delete a genre", async () => {
      await ensureAdminExists();
      const agent = request.agent(app);

      //*LOGIN
      await agent.post("/auth/login").send({
        username: "admin",
        password: "wdf#2025",
      });

      const response = await agent.delete("/genres/1");

      console.log("DELETE GENRE RESPONSE: ", response.body);
      expect(response.body.message).toBe("Genre deleted succesfully");
    });

    test("Get all genres", async () => {
      const response = await request(app).get("/genres");

      console.log("GET GENRES RESPONSE: ", response.body);
      expect(response.body.message).toBe("Genres retrieved succesfully");
    });

    test("Get genre by its id", async () => {
      const response = await request(app).get("/genres/2");

      console.log("GET GENRE BY ID RESPONSE: ", response.body);
      expect(response.body.message).toBe("Genre retrieved succesfully");
    });

    test("Get songs from genre", async () => {
      const response = await request(app).get("/genres/2/songs");

      console.log("GET SONGS FROM GENRE RESPONSE: ", response.body);
      expect(response.body.message).toBe("Songs retrieved succesfully");
    });
  });

  describe("Songs tests", () => {
    beforeAll(async () => {
      console.log(
        "------------------------\n--------SONGS----------\n------------------------"
      );
    });

    test("Return Songs from search bar", async () => {
      const response = await request(app).get("/songs/search?q=S");

      console.log("SEARCH SONGS RESPONSE: ", response.body);
      expect(response.body.message).toBe("Songs retrieved succesfully");
    });
  });
});
