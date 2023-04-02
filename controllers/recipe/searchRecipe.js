const { Recipe } = require("../../models");
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

module.exports = { searchRecipe };
