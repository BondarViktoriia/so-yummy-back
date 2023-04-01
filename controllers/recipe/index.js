const { ctrlWrapper } = require("../../middlewares");

const { getRecipeById } = require("./getRecipeById");

const { getRecipeMain } = require("./getRecipeMain")

module.exports = {
  getRecipeById: ctrlWrapper(getRecipeById),
  getRecipeMain: ctrlWrapper(getRecipeMain)
};
