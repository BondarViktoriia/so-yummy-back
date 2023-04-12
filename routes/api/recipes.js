const express = require("express");

const { recipe } = require("../../controllers");

const router = express.Router();

router.get("/category-list", recipe.getCategoriesList);

router.get("/categories/:categoryName", recipe.getRecipesByCategory);

router.get("/recipe/:id", recipe.getRecipeById);

router.get("/main", recipe.getRecipeMain);

module.exports = router;
