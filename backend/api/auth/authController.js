const { hashPassword, verifyPassword } = require("./authService");
const { registerUser, getUserByName } = require("./authRepository");
const makeResponse = require("../../commons/response");

async function RegisterUserController(req, res) {
  try {
    const { username, password } = req.body;
    const password_hash = await hashPassword(password);
    const userId = await registerUser(username, password_hash);
    res
      .status(200)
      .json(makeResponse(true, "User registered succesfully", userId, 200));
  } catch (error) {
    console.log("ERROR: ", error.message);
    res
      .status(500)
      .json(makeResponse(false, "Error registering user", error.message, 500));
  }
}

async function LoginController(req, res) {
  let loggedIn = false;
  try {
    const { username, password } = req.body;
    //Search username in db
    let user = await getUserByName(username);

    //Compare introduced password with hash in db
    await verifyPassword(password, user.password_hash);

    loggedIn = true;

    // the model to be sent to the view
    let model = {
      username: req.body.username,
      password: req.body.password,
      loggedIn: loggedIn,
    };

    req.session.isLoggedIn = true;
    req.session.username = username;

    //Check if admin
    if (user.is_admin) {
      req.session.isAdmin = true;
    } else {
      req.session.isAdmin = false;
    }

    console.log("---> SESSION INFORMATION: ", JSON.stringify(req.session));

    res
      .status(200)
      .json(makeResponse(true, "Login Succesfully", user.is_admin, 200));
  } catch (err) {
    console.log("LOGIN: Unable to login");
    //If user not exists
    if (err.code === "NOT_FOUND") {
      console.log("LOGIN: username does not exist");
      res
        .status(404)
        .json(
          makeResponse(false, "Unable to login", "Username does not exist", 500)
        );
    }
    //If invalid password
    if (err.code === "INVALID_PASSWORD") {
      console.log("LOGIN: invalid password");
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

async function LogoutController(req, res) {
  // destroy the current session
  req.session.destroy((err) => {
    if (err) {
      res
        .status(500)
        .json(
          makeResponse(
            false,
            "Error while destroying the session: ",
            err.message,
            500
          )
        );
    } else {
      res.status(200).json(makeResponse(true, "Logout Succesfully", null, 200));
    }
  });
}
module.exports = { RegisterUserController, LoginController, LogoutController };
