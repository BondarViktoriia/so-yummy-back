const { mongoose } = require("mongoose");
const { Recipe, OwnRecipe, PopularRecipe } = require("../../models");
const { RequestError } = require("../../helpers");

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const ObjectId = mongoose.Types.ObjectId;

  const isOwn = await OwnRecipe.findOne({ _id: ObjectId(`${id}`) });
  const isPopular = await PopularRecipe.findOne({ _id: ObjectId(`${id}`) });

  const fetchRecipe = async (model) => {
    const data = await model.aggregate([
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

    return data;
  };

  const recipe = await fetchRecipe(
    isOwn ? OwnRecipe : isPopular ? PopularRecipe : Recipe
  );

  if (!recipe) throw RequestError(404, "Not found");

  res.status(200).json({
    data: {
      recipe,
    },
  });
};

module.exports = { getRecipeById };
