const { ctrlWrapper } = require("../../middlewares");

const { getRecipeById } = require("./getRecipeById");

module.exports = {
  getRecipeById: ctrlWrapper(getRecipeById),
};
