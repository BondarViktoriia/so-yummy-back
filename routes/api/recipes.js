const express = require("express");

const { recipe } = require("../../controllers");

const router = express.Router();

router.get("/recipe/:id", recipe.getRecipeById);

router.get("/main", recipe.getRecipeMain )

module.exports = router;
