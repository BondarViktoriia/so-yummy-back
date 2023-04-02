const { Recipe } = require("../models");
const { RequestError } = require("../helpers");
const { ctrlWrapper } = require("../middlewares");

const searchRecipe = async (req, res) => {
  const { title } = req.query;
  const decodeTitle = decodeURI(title);
  const result = await Recipe.find({
    title: { $regex: decodeTitle, $options: 'i' },
  });
  res.json(result);
  if (!result) {
    throw RequestError(404, "Not found");
  }
};

const searchIngredient = async (req, res) => {
  const { ingredient } = req.params;
  const result = await Recipe.find({ title: { $regex: ingredient } });
  res.json(result);
  if (!result) {
    throw RequestError(404, "Not found");
  }
};

module.exports = {
  searchRecipe: ctrlWrapper(searchRecipe),
  searchIngredient: ctrlWrapper(searchIngredient),
};
