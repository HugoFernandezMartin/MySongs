const makeResponse = require("../models/response");

function adminAuthMiddleware(req, res, next) {
  console.log("REQ: ", req.session);
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

function userAuthMiddleware(req, res, next) {
  console.log("USERAUTHMIDDLEWARE");
  if (!req.session || !req.session.userId) {
    return res
      .status(401)
      .json(makeResponse(false, "You must log in", null, 401));
  }

  next();
}

module.exports = {
  adminAuthMiddleware,
  userAuthMiddleware,
};
