const {
  LoginController,
  RegisterUserController,
} = require("../../controllers/authController");

async function GetRegisterHandler(req, res) {
  if (req.session.userId) {
    res.redirect("/me");
  } else {
    res.render("register");
  }
}

async function PostRegisterHandler(req, res) {
  try {
    const { username, password } = req.body;
    const user = await RegisterUserController(username, password);

    res.render("account");
  } catch (err) {
    console.log("RegisterHandler Error: ", err.message);
    const model = { error: err.message };
    res.render("register", model);
  }
}

async function GetLoginHandler(req, res) {
  if (req.session.userId) {
    res.redirect("/me");
  } else {
    res.render("login");
  }
}

async function PostLoginHandler(req, res) {
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

    res.render("account");
  } catch (err) {
    console.log("LoginHandler Error: ", err.message);
    const model = { error: err.message };
    res.render("login", model);
  }
}

async function LogoutHandler(req, res) {
  req.session.destroy((err) => {
    // destroy the current session
    if (err) {
      console.log("Error while destroying the session: ", err);
      res.redirect("/"); // go back to homepage
    } else {
      console.log("Logged out...");
      res.redirect("/"); // go back to homepage
    }
  });
}

module.exports = {
  GetRegisterHandler,
  PostRegisterHandler,
  GetLoginHandler,
  LogoutHandler,
  PostLoginHandler,
};
