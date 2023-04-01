const express = require('express')
const { recipe } = require("../../controllers");

const router = express.Router()

router.get("/", recipe.getPopularRecipes)

module.exports = router