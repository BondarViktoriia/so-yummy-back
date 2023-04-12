const { RequestError } = require("../../helpers");
const { Recipe, PopularRecipe } = require("../../models");
const { mongoose } = require("mongoose");

const addToFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  const ObjectId = mongoose.Types.ObjectId;

  const isPopular = await PopularRecipe.findOne({ _id: ObjectId(`${id}`) });

  const updateRecipe = async (model) => {
    const isFavorite = await model.findOne({ _id: id, favorites: userId });
    if (isFavorite) {
      throw RequestError(409, "This recipe has already added to favorite");
    }
    const favoriteRecipe = await model
      .findOneAndUpdate(
        { _id: id },
        { $push: { favorites: userId } },
        { new: true }
      )
      .then()
      .catch((error) => console.log(error.message));
    console.log("updateRecipe   favoriteRecipe:", favoriteRecipe);
    return favoriteRecipe;
  };

  const updatedRecipe = await updateRecipe(isPopular ? PopularRecipe : Recipe);

  if (!updatedRecipe) {
    throw RequestError(400, "Something is wrong");
  }

  res.status(201).json({ message: "Added to favorite", data: updatedRecipe });
};

module.exports = { addToFavorite };
