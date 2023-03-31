const express = require("express");

const { recipe } = require("../../controllers");

const router = express.Router();

router.get("/recipe/:id", recipe.getRecipeById);

module.exports = router;
