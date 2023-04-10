const { RequestError } = require("../../helpers");
const { Recipe } = require("../../models");

const deleteFromFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  const isFavorite = await Recipe.findOne({ _id: id, favorites: userId });
  if (!isFavorite) {
    throw RequestError(409, "This recipe is not in favorites");
  }
  const removedRecipe = await Recipe.findOneAndUpdate(
    { _id: id },
    { $pull: { favorites: userId } },
    { new: true }
  );
  res
    .status(201)
    .json({ message: "Deleted from favorite", data: removedRecipe });
};

module.exports = { deleteFromFavorite };
