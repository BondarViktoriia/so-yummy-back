const { mongoose } = require("mongoose");
const { Recipe } = require("../../models");
const { RequestError } = require("../../helpers");

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const ObjectId = mongoose.Types.ObjectId;

  const recipe = await Recipe.aggregate([
    { $match: { _id: ObjectId(`${id}`) } },
    {
      $lookup: {
        from: "ingreds",
        localField: "ingredients.id",
        foreignField: "_id",
        as: "ingredientsInfo",
      },
    },
    {
      $set: {
        ingredients: {
          $map: {
            input: "$ingredients",
            in: {
              $mergeObjects: [
                "$$this",
                {
                  $arrayElemAt: [
                    "$ingredientsInfo",
                    { $indexOfArray: ["$ingredientsInfo._id", "$$this.id"] },
                  ],
                },
              ],
            },
          },
        },
      },
    },
    { $unset: ["ingredientsInfo", "ingredients.id"] },
  ]);

  if (!recipe) throw RequestError(404, "Not found");

  res.status(200).json({
    data: {
      recipe,
    },
  });
};

module.exports = { getRecipeById };
