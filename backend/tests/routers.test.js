const app = require("../../app.js");
const request = require("supertest");
const { resetDB, ensureAdminExists } = require("./testUtils.js");

describe("Routers tests", () => {
  beforeEach(async () => {
    await resetDB();
  });
  //#region MIDDLEWARE
  describe("Middleware tests: ", () => {
    beforeAll(async () => {
      console.log(
        "------------------------\n------MIDDLEWARE--------\n------------------------"
      );
    });

    test("Try to log out without log in first", async () => {
      const response = await request(app).get("/api/auth/logout");
      //console.log("LOGOUT RESPONSE: ", response.body);
      expect(response.body.message).toBe("You must log in");
    });

    test("Try to create a genre without being admin", async () => {
      await ensureAdminExists();
      const agent = request.agent(app);

      //*REGISTER
      await agent.post("/api/auth/register").send({
        username: "angelica123",
        password: "pass123",
        confirm_password: "pass123",
      });

      //*LOGIN
      await agent.post("/api/auth/login").send({
        username: "angelica123",
        password: "pass123",
      });

      //*Create a genre
      const response = await agent.post(`/api/genres`).send({
        name: "RAP",
        description: "JUST RAP",
      });

      expect(response.body.message).toBe("Authentication Error");
    });
  });
  //#region USER
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
      const response = await request(app).get("/api/users");
      //console.log("RESPONSE: ", response.body);
      expect(response.body.message).toBe("Users retrieved succesfully");
    });

    test("Get a user by Id: ", async () => {
      const response = await request(app).get("/api/users/1");
      //console.log("RESPONSE: ", response.body);
      expect(response.body.message).toBe("User retrieved succesfully");
    });

    test("Create a new user: ", async () => {
      const response = await request(app).post("/api/users").send({
        username: "angelica123",
        password: "pass123",
        isAdmin: false,
      });
      //console.log("CREATE NEW USER RESPONSE: ", response.body);
      expect(response.body.message).toBe("User created succesfully");
    });
  });
  //#region ACCOUNT
  describe("Account tests: ", () => {
    beforeAll(async () => {
      console.log(
        "------------------------\n-------ACCOUNT---------\n------------------------"
      );
    });
    test("Register user:", async () => {
      //*REGISTER
      const response = await request(app).post("/api/auth/register").send({
        username: "angelica123",
        password: "pass123",
        confirm_password: "pass123",
      });
      //console.log("REGISTER RESPONSE: ", response.body);
      expect(response.body.message).toBe("User registered succesfully");
    });

    test("Register, Log in and log out", async () => {
      const agent = request.agent(app);

      await agent.post("/api/auth/register").send({
        username: "angelica123",
        password: "pass123",
        confirm_password: "pass123",
      });

      //*LOGIN
      const rl = await agent.post("/api/auth/login").send({
        username: "angelica123",
        password: "pass123",
      });
      //console.log("LOGIN RESPONSE: ", rl.body);
      expect(rl.body.message).toBe("Login Succesfully");

      //*LOGOUT
      const rlo = await agent.get("/api/auth/logout");
      //console.log("LOGOUT RESPONSE: ", rlo.body);
      expect(rlo.body.message).toBe("Logout Successfully");
    });

    test("Register, log in and delete account", async () => {
      const agent = request.agent(app);

      //*REGISTER
      await agent.post("/api/auth/register").send({
        username: "angelica123",
        password: "pass123",
        confirm_password: "pass123",
      });

      //*LOGIN
      await agent.post("/api/auth/login").send({
        username: "angelica123",
        password: "pass123",
      });

      //*DELETE ACCOUNT
      const response = await agent.delete("/api/me/delete").send({
        password: "pass123",
      });
      //console.log("DELETE ACCOUNT RESPONSE: ", response.body);
      expect(response.body.message).toBe("Account deleted succesfully");
    });

    test("Register, log in and update password", async () => {
      const agent = request.agent(app);

      //*REGISTER
      await agent.post("/api/auth/register").send({
        username: "angelica123",
        password: "pass123",
        confirm_password: "pass123",
      });

      //*LOGIN
      await agent.post("/api/auth/login").send({
        username: "angelica123",
        password: "pass123",
      });

      //*UPDATE PASSWORD
      const response = await agent.put("/api/me/update_password").send({
        password: "pass123",
        newPassword: "newPass123",
      });
      //console.log("UPDATE PASSWORD RESPONSE: ", response.body);
      expect(response.body.message).toBe("Password updated succesfully");
    });

    test("Register, log in and retrieve playlist", async () => {
      const agent = request.agent(app);

      //*REGISTER
      await agent.post("/api/auth/register").send({
        username: "angelica123",
        password: "pass123",
        confirm_password: "pass123",
      });

      //*LOGIN
      await agent.post("/api/auth/login").send({
        username: "angelica123",
        password: "pass123",
      });

      //*RETURN PLAYLISTS
      const response = await agent.get("/api/me/playlists");
      //console.log("GET PLAYLISTS RESPONSE: ", response.body);
      expect(response.body.message).toBe("Playlists retrieved succesfully");
    });
  });

  //#region PLAYLISTS
  describe("Playlists tests: ", () => {
    beforeAll(async () => {
      console.log(
        "------------------------\n-------PLAYLIST-----------\n------------------------"
      );
    });
    test("Create a new playlist", async () => {
      const agent = request.agent(app);

      //*REGISTER
      await agent.post("/api/auth/register").send({
        username: "angelica123",
        password: "pass123",
        confirm_password: "pass123",
      });

      //*LOGIN
      await agent.post("/api/auth/login").send({
        username: "angelica123",
        password: "pass123",
      });

      //*CREATE PLAYLIST
      const response = await agent.post("/api/playlists").send({
        title: "Chill Vibes",
      });
      //console.log("CREATE PLAYLIST RESPONSE: ", response.body);
      expect(response.body.message).toBe("Playlist created succesfully");
    });

    test("Create and delete a playlist", async () => {
      const agent = request.agent(app);
      let response;

      //*REGISTER
      await agent.post("/api/auth/register").send({
        username: "angelica123",
        password: "pass123",
        confirm_password: "pass123",
      });

      //*LOGIN
      await agent.post("/api/auth/login").send({
        username: "angelica123",
        password: "pass123",
      });

      //*CREATE PLAYLIST
      response = await agent.post("/api/playlists").send({
        title: "Chill Vibes",
      });

      //*DELETE PLAYLIST
      const playlistId = response.body.responseObject;
      const deleteResponse = await agent.delete(`/api/playlists/${playlistId}`);

      //console.log("DELETE PLAYLIST RESPONSE: ", deleteResponse.body);
      expect(deleteResponse.body.message).toBe("Playlist deleted succesfully");
    });

    test("Add a song to playlist", async () => {
      //*ADD SONG TO PLAYLIST 1
      const response = await request(app).post(`/api/playlists/2/songs`).send({
        songId: 1,
      });

      //console.log("ADD SONG TO PLAYLIST RESPONSE: ", response.body);
      expect(response.body.message).toBe("Song added to playlist succesfully");
    });

    test("Remove a song from a playlist", async () => {
      //*REMOVE SONG 1 FROM PLAYLIST 1
      const response = await request(app).delete(`/api/playlists/1/songs/1`);

      //console.log("REMOVE SONG FROM PLAYLIST RESPONSE: ", response.body);
      expect(response.body.message).toBe(
        "Song removed from playlist succesfully"
      );
    });

    test("Get all songs from a playlist", async () => {
      //*GET SONGS FROM PLAYLIST 1
      const response = await request(app).get(`/api/playlists/1/songs`);

      //console.log("GET SONGS FROM PLAYLIST RESPONSE: ", response.body);
      expect(response.body.message).toBe(
        "Songs from playlist retrieved successfully"
      );
    });
  });

  //#region GENRES
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
      await agent.post("/api/auth/login").send({
        username: "admin",
        password: "wdf#2025",
      });

      //*Create a genre
      const response = await agent.post(`/api/genres`).send({
        name: "RAP",
        description: "JUST RAP",
      });

      expect(response.body.message).toBe("Genre created succesfully");
    });

    test("Delete a genre", async () => {
      await ensureAdminExists();
      const agent = request.agent(app);

      //*LOGIN
      await agent.post("/api/auth/login").send({
        username: "admin",
        password: "wdf#2025",
      });

      const response = await agent.delete("/api/genres/1");

      console.log("DELETE GENRE RESPONSE: ", response.body);
      expect(response.body.message).toBe("Genre deleted succesfully");
    });

    test("Get all genres", async () => {
      const response = await request(app).get("/api/genres");

      //console.log("GET GENRES RESPONSE: ", response.body);
      expect(response.body.message).toBe("Genres retrieved succesfully");
    });

    test("Get genre by its id", async () => {
      const response = await request(app).get("/api/genres/2");

      //console.log("GET GENRE BY ID RESPONSE: ", response.body);
      expect(response.body.message).toBe("Genre retrieved succesfully");
    });

    test("Get songs from genre", async () => {
      const response = await request(app).get("/api/genres/2/songs");

      //console.log("GET SONGS FROM GENRE RESPONSE: ", response.body);
      expect(response.body.message).toBe("Songs retrieved succesfully");
    });
  });

  //#region SONGS
  describe("Songs tests", () => {
    beforeAll(async () => {
      console.log(
        "------------------------\n--------SONGS----------\n------------------------"
      );
    });

    test("Return Songs from search bar", async () => {
      const response = await request(app).get("/api/songs/search?q=S&limit=3");

      //console.log("SEARCH SONGS RESPONSE: ", response.body);
      expect(response.body.message).toBe("Songs retrieved succesfully");
    });
  });
});
