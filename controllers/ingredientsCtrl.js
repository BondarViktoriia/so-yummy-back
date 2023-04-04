const Ingredient = require('../models/ingredient');
const { Recipe } = require('../models/recipe');

const { ctrlWrapper } = require('../middlewares');
const { RequestError } = require('../helpers');

const ingredientsAll = async (req, res) => {
  const allIngreds = await Ingredient.find();

  res.status(201).json(allIngreds);
};

const receipeByIngredient = async (req, res) => {
  // ingredient має прийти з фронта як динамічний параметр запиту. Назва інгредієнту може бути з малої або великої
  // http://localhost:3000/api/ingredients/?ingredient=Chicken
  const ingredName = req.query.ingredient;

  if (!ingredName) {
    throw RequestError(400, 'Put an ingredient name');
  }

  const ttl = ingredName.charAt(0).toUpperCase() + ingredName.slice(1);

  const ingredID = await Ingredient.findOne({ ttl }, '_id');

  if (!ingredID) {
    throw RequestError(400, 'There is no such ingredient');
  }

  const { _id } = ingredID;

  const allRecipe = await Recipe.find({
    ingredients: { $elemMatch: { id: _id } },
  });

  res.status(201).json(allRecipe);
};

module.exports = {
  ingredientsAll: ctrlWrapper(ingredientsAll),
  receipeByIngredient: ctrlWrapper(receipeByIngredient),
};
