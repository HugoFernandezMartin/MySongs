const app = require("../../app.js");
const request = require("supertest");
const { resetDB } = require("../db/database.js");

describe("Routers tests", () => {
  beforeEach(async () => {
    await resetDB();
  });
  describe("User Routes tests: ", () => {
    beforeEach(async () => {
      await resetDB();
    });

    test("Get all users: ", async () => {
      const response = await request(app).get("/users");
      console.log("RESPONSE: ", response.body);
      expect(response.body).toEqual({
        success: true,
        message: "Users retrieved succesfully",
        responseObject: [
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
        ],
        statusCode: 200,
      });
    });

    test("Get a user by Id: ", async () => {
      const response = await request(app).get("/users/1");
      console.log("RESPONSE: ", response.body);
      expect(response.body).toEqual({
        success: true,
        message: "User retrieved succesfully",
        responseObject: {
          user_id: 1,
          username: "hugo_dev",
          password_hash: "hash123",
          profile_picture: "avatars/hugo.png",
          is_admin: 0,
        },
        statusCode: 200,
      });
    });

    test("Create a new user: ", async () => {
      const response = await request(app).post("/users").send({
        username: "angelica123",
        password: "pass123",
      });
      console.log("RESPONSE: ", response.body);
      expect(response.body.message).toBe("User created succesfully");
    });
  });

  describe("Authentication tests: ", () => {
    beforeEach(async () => {
      await resetDB();
    });

    test("Register user, log in and log out:", async () => {
      let response;
      //*REGISTER
      response = await request(app).post("/auth/register").send({
        username: "angelica123",
        password: "pass123",
      });
      console.log("RESPONSE: ", response.body);
      expect(response.body.message).toBe("User registered succesfully");

      //*LOGIN
      response = await request(app).post("/auth/login").send({
        username: "angelica123",
        password: "pass123",
      });
      console.log("LOGIN RESPONSE: ", response.body);
      expect(response.body.message).toBe("Login Succesfully");

      //*LOGOUT
      response = await request(app).get("/auth/logout");
      console.log("LOGOUT RESPONSE: ", response.body);
      expect(response.body.message).toBe("Logout Succesfully");
    });
  });
});
