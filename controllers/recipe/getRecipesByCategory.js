const { Recipe } = require("../../models");
const { RequestError } = require("../../helpers");

const getRecipesByCategory = async (req, res) => {
  const { categoryName } = req.params;
  const capitilizedCategory =
    categoryName[0].toUpperCase() + categoryName.slice(1);

  const result = await Recipe.find({ category: capitilizedCategory });

  if (result.length === 0) {
    throw RequestError(404, "Not found recipes by such category");
  }

  const { page = 1, limit = 8 } = req.query;

  if (result.length === 0) {
    return res.json({
      status: "success",
      code: 200,
      data: {
        result: result,
      },
      total: 0,
    });
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result: result.slice(),
    },
    total: result.length,
    page,
    limit,
  });
};

module.exports = { getRecipesByCategory };
