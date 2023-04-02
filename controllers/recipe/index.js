const { ctrlWrapper } = require("../../middlewares");

const addRecipe = require("./addRecipe");
const deleteRecipe = require("./deleteRecipe");
const getOwnerRecipes = require("./getOwnerRecipes");
const { getRecipeById } = require("./getRecipeById");
const { getPopularRecipes } = require("./getPopularRecipes");

const {searchRecipe} = require("./searchRecipe")

const { getFavorite } = require("./getFavorite");

const { addToFavorite } = require("./addToFavorite");
const { deleteFromFavorite } = require("./deleteFromFavorite");

const { getCategories } = require("./getCategories");
const { getRecipeMain } = require("./getRecipeMain");


module.exports = {
  getRecipeById: ctrlWrapper(getRecipeById),
  addRecipe: ctrlWrapper(addRecipe),
  deleteRecipe: ctrlWrapper(deleteRecipe),
  getOwnerRecipes: ctrlWrapper(getOwnerRecipes),
  getRecipeMain: ctrlWrapper(getRecipeMain),
  getPopularRecipes: ctrlWrapper(getPopularRecipes),
  searchRecipe: ctrlWrapper(searchRecipe)
  addToFavorite: ctrlWrapper(addToFavorite),
  getCategories: ctrlWrapper(getCategories),
  getFavorite: ctrlWrapper(getFavorite),
  deleteFromFavorite: ctrlWrapper(deleteFromFavorite),
};
