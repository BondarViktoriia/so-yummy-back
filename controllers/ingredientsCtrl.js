const Ingredient = require('../models/ingredient');
const { Recipe } = require('../models/recipe');

const { ctrlWrapper } = require('../middelwares');

const ingredientsAll = async (req, res) => {
  const allIngreds = await Ingredient.find();

  res.status(201).json(allIngreds);
};

const receipeByIngredient = async (req, res) => {
  const allRecipe = await Recipe.findById('6426a8c69388c4008e8266f8');

  // for (let recipe of allRecipe) {
  //   recipe.ingredients;
  // }

  res.status(201).json(allRecipe.ingredients);
};

module.exports = {
  ingredientsAll: ctrlWrapper(ingredientsAll),
  receipeByIngredient: ctrlWrapper(receipeByIngredient),
};
