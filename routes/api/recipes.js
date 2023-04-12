const express = require("express");

const { recipe } = require("../../controllers");

const router = express.Router();

router.get("/recipe/:id", recipe.getRecipeById);

router.get("/recipe/category-list", recipe.getCategoriesList);

router.get("/recipe/categories/:categoryName", recipe.getRecipesByCategory);

router.get("/main", recipe.getRecipeMain);

module.exports = router;
