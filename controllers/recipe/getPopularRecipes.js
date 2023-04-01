const { Recipe } = require("../../models");
const { RequestError } = require("../../helpers");

const getPopularRecipes = async (req, res) => {
  console.log(Recipe);
  const result = await Recipe.aggregate([
    {
      $project: {
        favorites: 1,
        count: { $size: "$favorites" },
      },
    },
    { $sort: { count: -1 } },
    { $skip: 0 },
    { $limit: 4 }
  ]);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = { getPopularRecipes };
