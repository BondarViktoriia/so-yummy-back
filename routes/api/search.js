const express = require('express')
const { search } = require("../../controllers");

const router = express.Router()

router.get("/recipes", search.searchRecipe)
router.get("/ingredients/:ingredient", search.searchIngredient)

module.exports = router