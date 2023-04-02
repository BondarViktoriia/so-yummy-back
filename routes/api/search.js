const express = require("express");
const { recipe } = require("../../controllers");
const {ingredient} = require("../../controllers");

const router = express.Router();

router.get("/recipes", recipe.searchRecipe);
router.get("/ingredients", ingredient.searchIngredient)

module.exports = router;
