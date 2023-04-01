const express = require("express");

const { auth, validation } = require("../../middlewares");
const { addSchema } = require("../../models/recipe");
const { recipe } = require("../../controllers");

const router = express.Router();

router.post("/", auth, validation(addSchema), recipe.addRecipe);
router.delete("/:id", auth, recipe.deleteRecipe);
router.get("/", auth, recipe.getOwnerRecipes);

module.exports = router;