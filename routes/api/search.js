const express = require("express");
const { recipe } = require("../../controllers");

const router = express.Router();

router.get("/recipes", recipe.searchRecipe);

module.exports = router;
