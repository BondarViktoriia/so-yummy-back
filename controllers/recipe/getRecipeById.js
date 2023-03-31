const { Recipe } = require("../../models");
const { RequestError } = require("../../helpers");

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recepie = Recipe.findById(id);

  if (!recepie) throw RequestError(404, "Not found");

  res.status(200).json({
    data: {
      recepie,
    },
  });
};

module.exports = { getRecipeById };
