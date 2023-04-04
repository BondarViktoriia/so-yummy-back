const { RequestError } = require("../../helpers");
const { Recipe } = require("../../models");

const addToFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  const isFavorite = await Recipe.findOne({ _id: id, favorites: userId });
  if (isFavorite) {
    throw RequestError(409, "This recipe has already added to favorite");
  }
  const favoriteRecipe = await Recipe.updateOne(
    { _id: id },
    { $push: { favorites: userId } },
    { new: true }
  );
  if (!favoriteRecipe) {
    throw RequestError(400, "Something is wrong");
  }
  res.status(201).json({ message: "Added to favorite" });
};

module.exports = { addToFavorite };
