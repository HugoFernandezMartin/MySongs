const makeResponse = require("../models/response");

function adminAuthMiddlewareApi(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res
      .status(401)
      .json(makeResponse(false, "You must log in", null, 401));
  }

  if (!req.session.isAdmin) {
    return res
      .status(403)
      .json(makeResponse(false, "Authentication Error", null, 403));
  }

  next();
}

//Authentication middlewares
function userAuthMiddlewareApi(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res
      .status(401)
      .json(makeResponse(false, "You must log in", null, 401));
  }

  next();
}

function adminAuthMiddlewareView(req, res, next) {
  if (!req.session || !req.session.userId) {
    req.session.info = "You must log in";
    return res.redirect("/auth/login");
  }

  if (!req.session.isAdmin) {
    req.session.info = "You must be admin";
    return res.redirect("/");
  }

  next();
}

function userAuthMiddlewareView(req, res, next) {
  if (!req.session || !req.session.userId) {
    req.session.info = "You must log in";
    return res.redirect("/auth/login");
  }
  next();
}

module.exports = {
  adminAuthMiddlewareApi,
  userAuthMiddlewareApi,
  adminAuthMiddlewareView,
  userAuthMiddlewareView,
};
