const makeResponse = require("../../commons/models/response");
const {
  LogoutController,
  LoginController,
  RegisterUserController,
} = require("../../controllers/authController");

async function RegisterHandler(req, res) {
  try {
    const { username, password } = req.body;
    const userId = await RegisterUserController(username, password);
    res
      .status(200)
      .json(makeResponse(true, "User registered succesfully", userId, 200));
  } catch (error) {
    console.log("RegisterHandler Error: ", error.message);
    res
      .status(500)
      .json(makeResponse(false, "Error registering user", error.message, 500));
  }
}
async function LogoutHandler(req, res) {
  req.session.destroy((err) => {
    // destroy the current session
    if (err) {
      res
        .status(500)
        .json(makeResponse(false, "Error destroying session", err.message));
    } else {
      res.status(200).json(makeResponse(true, "Logout Successfully"));
    }
  });
}

async function LoginHandler(req, res) {
  try {
    const { username, password } = req.body;
    const user = await LoginController(username, password);

    req.session.isLoggedIn = true;
    req.session.userId = user.user_id;
    req.session.username = username;

    //Check if admin
    if (user.is_admin) {
      req.session.isAdmin = true;
    } else {
      req.session.isAdmin = false;
    }

    res
      .status(200)
      .json(makeResponse(true, "Login Succesfully", user.user_id, 200));
  } catch (err) {
    console.log("LoginHandler Error", err.message);
    //If user not exists
    if (err.code === "NOT_FOUND") {
      res
        .status(404)
        .json(
          makeResponse(false, "Unable to login", "Username does not exist", 500)
        );
    }
    //If invalid password
    if (err.code === "INVALID_PASSWORD") {
      res
        .status(401)
        .json(makeResponse(false, "Unable to login", "Invalid password", 500));
    }
    //Other error
    res
      .status(500)
      .json(makeResponse(false, "Unable to login", err.message, 500));
  }
}

module.exports = { LogoutHandler, LoginHandler, RegisterHandler };
