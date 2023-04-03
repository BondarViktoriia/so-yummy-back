const express = require("express");
const { recipe } = require("../../controllers");
const {ingredient} = require("../../controllers");
const { auth } = require("../../middlewares");

const router = express.Router();

router.get("/recipes", auth, recipe.searchRecipe);
router.get("/ingredients", auth, ingredient.searchIngredient)

module.exports = router;
