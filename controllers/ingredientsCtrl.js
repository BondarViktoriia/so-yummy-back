const Ingredient = require('../models/ingredient');

const { ctrlWrapper } = require('../middelwares');

const ingredientsAll = async (req, res) => {
  const allIngreds = await Ingredient.find();

  res.status(201).json(allIngreds);
};

module.exports = { ingredientsAll: ctrlWrapper(ingredientsAll) };
