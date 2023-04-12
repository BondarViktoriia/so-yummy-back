const { RequestError } = require("../../helpers");
const { Recipe, PopularRecipe } = require("../../models");
const { mongoose } = require("mongoose");

const deleteFromFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  const ObjectId = mongoose.Types.ObjectId;

  const isPopular = await PopularRecipe.findOne({ _id: ObjectId(`${id}`) });

  const deleteRecipe = async (model) => {
    const isFavorite = await model.findOne({ _id: id, favorites: userId });
    if (!isFavorite) {
      throw RequestError(409, "This recipe is not in favorites");
    }
    const removedRecipe = await model
      .findOneAndUpdate(
        { _id: id },
        { $pull: { favorites: userId } },
        { new: true }
      )
      .then()
      .catch((error) => console.log(error.message));

    return removedRecipe;
  };

  const removedRecipe = await deleteRecipe(isPopular ? PopularRecipe : Recipe);

  if (!removedRecipe) {
    throw RequestError(400, "Something is wrong");
  }

  res
    .status(201)
    .json({ message: "Deleted from favorite", data: removedRecipe });
};

module.exports = { deleteFromFavorite };
