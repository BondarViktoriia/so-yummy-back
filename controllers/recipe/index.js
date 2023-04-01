const { ctrlWrapper } = require("../../middlewares");

const { getRecipeById } = require("./getRecipeById");
const { getFavorite } = require("./getFavorite");

module.exports = {
  getRecipeById: ctrlWrapper(getRecipeById),
  getFavorite: ctrlWrapper(getFavorite),
};
