const { ctrlWrapper } = require("../../middlewares");

const addRecipe = require("./addRecipe");
const deleteRecipe = require("./deleteRecipe");
const getOwnerRecipes = require("./getOwnerRecipes");
const { getRecipeById } = require("./getRecipeById");

module.exports = {
    getRecipeById: ctrlWrapper(getRecipeById),
    addRecipe: ctrlWrapper(addRecipe),
    deleteRecipe: ctrlWrapper(deleteRecipe),
    getOwnerRecipes: ctrlWrapper(getOwnerRecipes),
};