const { Recipe } = require("../../models/recipe");
const { RequestError } = require("../../helpers");

const getCategories = async (req, res) => {
  const categoriesList = [];

  const result = await Recipe.find({}, "category").distinct("category");

  for (const category of result) {
    const recipes = await Recipe.find({ category }).limit(8);
    categoriesList.push({ category, recipes });
  }

  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(categoriesList);
};
module.exports = { getCategories };
