const { RequestError } = require("../../helpers");
const { Recipe } = require("../../models");

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const data = await Recipe.findByIdAndRemove(id);

  if (!data) {
    throw RequestError(404, "Not found");
  }

  res.json({ code: 200, status: "Success", data });
};

module.exports = deleteRecipe;
