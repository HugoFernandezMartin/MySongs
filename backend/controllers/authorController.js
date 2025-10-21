const { GetAuthorByName } = require("../commons/utils/authorUtils");
const {
  DeleteAuthor,
  CreateAuthor,
} = require("../repositories/authorRepository");

async function CreateAuthorController(name, description) {
  await CreateAuthor(name, description);
}

async function DeleteAuthorController(authorName) {
  const authorData = await GetAuthorByName(authorName);

  await DeleteAuthor(authorData.author_id);
}

module.exports = { CreateAuthorController, DeleteAuthorController };
