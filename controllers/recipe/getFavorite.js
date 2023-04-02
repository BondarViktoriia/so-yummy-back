const { RequestError } = require("../../helpers");
const { Recipe } = require("../../models");

const getFavorite = async (req, res) => {
  const { _id } = req.user;
  const data = await Recipe.find({ favorites: _id });
  if (!data) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(data);
};

module.exports = { getFavorite };
