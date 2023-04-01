const { ctrlWrapper } = require("../../middlewares");

const { getRecipeById } = require("./getRecipeById");
const { getPopularRecipes } = require("./getPopularRecipes");
const { getFavorite } = require("./getFavorite");

module.exports = {
  getRecipeById: ctrlWrapper(getRecipeById),
  getPopularRecipes: ctrlWrapper(getPopularRecipes),
  getFavorite: ctrlWrapper(getFavorite),
};
