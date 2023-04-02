const { ctrlWrapper } = require("../../middlewares");

const addRecipe = require("./addRecipe");
const deleteRecipe = require("./deleteRecipe");
const getOwnerRecipes = require("./getOwnerRecipes");
const { getRecipeById } = require("./getRecipeById");
const { getPopularRecipes } = require("./getPopularRecipes");
const { getFavorite } = require("./getFavorite");
const { getCategories } = require("./getCategories");

const { getRecipeMain } = require("./getRecipeMain");

module.exports = {
  getRecipeById: ctrlWrapper(getRecipeById),
  addRecipe: ctrlWrapper(addRecipe),
  deleteRecipe: ctrlWrapper(deleteRecipe),
  getOwnerRecipes: ctrlWrapper(getOwnerRecipes),
  getRecipeMain: ctrlWrapper(getRecipeMain),
  getPopularRecipes: ctrlWrapper(getPopularRecipes),
  getFavorite: ctrlWrapper(getFavorite),
  getCategories: ctrlWrapper(getCategories),
};
