const express = require('express')
const { recipe } = require("../../controllers");
const { auth } = require("../../middlewares");

const router = express.Router()

router.get("/", auth, recipe.getPopularRecipes)

module.exports = router