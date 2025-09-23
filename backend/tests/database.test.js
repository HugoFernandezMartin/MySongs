const { initDB, resetDB } = require("../db/database");
const db = initDB();
const { create_user, get_user_data } = require("../db/queries/users");

describe("User management tests", () => {
  beforeEach(() => {
    resetDB();
  });

  test("Create new user and check if created", async () => {
    const id = await create_user("huguito", "huguito@gmail.com", "1234_hash");
    const user = await get_user_data(id);
    console.log("User: ", user);
  });
});
