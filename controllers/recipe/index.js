const { ctrlWrapper } = require("../../middlewares");

const { getRecipeById } = require("./getRecipeById");
const { getPopularRecipes } = require("./getPopularRecipes");
const { getFavorite } = require("./getFavorite");

const { getRecipeMain } = require("./getRecipeMain")

module.exports = {
  getRecipeById: ctrlWrapper(getRecipeById),
  getRecipeMain: ctrlWrapper(getRecipeMain)
  getPopularRecipes: ctrlWrapper(getPopularRecipes),
  getFavorite: ctrlWrapper(getFavorite),
};
