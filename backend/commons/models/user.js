/*
    Global type for users.
  User:
    {
      user_id: number,
      username: string,
      is_admin: boolean,
    }

*/
function makeUser(user_id, username, is_admin) {
  return {
    user_id,
    username,
    is_admin,
  };
}

module.exports = makeUser;
