const { RequestError } = require("../../helpers");
const { OwnRecipe } = require("../../models");

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const data = await OwnRecipe.findByIdAndRemove(id);

  if (!data) {
    throw RequestError(404, "Not found");
  }

  res.json({ code: 200, status: "Success", data });
};

module.exports = deleteRecipe;
