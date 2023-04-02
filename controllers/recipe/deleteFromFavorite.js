const { RequestError } = require("../../helpers");
const { Recipe } = require("../../models");

const deleteFromFavorite = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const isFavorite = await Recipe.findOne({ _id, id });
  if (!isFavorite) {
    throw RequestError(409, "This recipe is not in favorites");
  }
  await Recipe.findOneAndUpdate(id, { $unset: { favorites: _id } });
  res.status(201).json({ message: "Deleted from favorite" });
};

module.exports = { deleteFromFavorite };
