const {
  CreateAuthorController,
  DeleteAuthorController,
} = require("../../controllers/authorController");

async function CreateAuthorHandler(req, res) {
  try {
    const { name, description } = req.body;
    await CreateAuthorController(name, description);

    model = { info: "Author created succesfully" };
    res.render("admin", model);
  } catch (err) {
    console.log("CreateAuthorHandlerError: ", err.message);
    model = { error: err.message };
    res.render("admin", model);
  }
}

async function DeleteAuthorHandler(req, res) {
  try {
    const { name } = req.body;

    await DeleteAuthorController(name);

    model = { info: "Author deleted succesfully" };
    res.render("admin", model);
  } catch (err) {
    console.log("DeleteAuthorHandlerError: ", err.message);
    model = { error: err.message };
    res.render("admin", model);
  }
}

module.exports = { CreateAuthorHandler, DeleteAuthorHandler };
