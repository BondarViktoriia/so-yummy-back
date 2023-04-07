const { Recipe } = require("../../models");
const { Ingredient } = require("../../models");
const { RequestError } = require("../../helpers");


const searchRecipe = async (req, res) => {
  const { title } = req.query;
  const decodeTitle = decodeURI(title);
  const result = await Recipe.find({
    title: { $regex: decodeTitle, $options: "i" },
  });
  res.json(result);
  if (!result) {
    throw RequestError(404, "Not found");
  }
};

const searchRecipeByIngredient = async (req, res) => {
  const { title } = req.query;
  const ingredID = await Ingredient.findOne({
    ttl: { $regex: title, $options: "i" },
  }, '_id');
  const { _id } = ingredID;
  const result = await Recipe.find({
    ingredients: { $elemMatch: { id: _id } },
  });
  if (!result) {
    throw RequestError(400, "There is no such ingredient");
  }
  res.status(201).json(result);
};



module.exports = { searchRecipe, searchRecipeByIngredient };
