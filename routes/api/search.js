const express = require("express");
const { recipe } = require("../../controllers");
// const {ingredient} = require("../../controllers");
// const { auth } = require("../../middlewares");

const router = express.Router();

router.get("/recipes", recipe.searchRecipe);
router.get("/ingredients", recipe.searchRecipeByIngredient)

module.exports = router;
