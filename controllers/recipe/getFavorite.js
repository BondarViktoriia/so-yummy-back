const { RequestError } = require("../../helpers");
const { Recipe } = require("../../models");

const getFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const result = await Recipe.find({ favorites: userId });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({
    code: 200,
    status: "success",
    data: {
      result,
    },
  });
};

module.exports = { getFavorite };
