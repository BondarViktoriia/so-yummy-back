const { Ingredient } = require("../../models");
const { RequestError } = require("../../helpers");

const searchIngredient = async (req, res) => {
  const { title } = req.query;
  const decodeTitle = decodeURI(title);
  const result = await Ingredient.find({
    ttl: { $regex: decodeTitle, $options: "i" },
  });
  res.json(result);
  if (!result) {
    throw RequestError(404, "Not found");
  }
};

module.exports = { searchIngredient };
