const { ctrlWrapper } = require("../../middlewares");

const { getRecipeById } = require("./getRecipeById");
const { getPopularRecipes } = require("./getPopularRecipes");
const {searchRecipe} = require("./searchRecipe")

module.exports = {
  getRecipeById: ctrlWrapper(getRecipeById),
  getPopularRecipes: ctrlWrapper(getPopularRecipes),
  searchRecipe: ctrlWrapper(searchRecipe)
};
