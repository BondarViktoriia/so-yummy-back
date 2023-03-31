const express = require('express');

const router = express.Router();

const Ingredient = require('../../models/ingredient');

const ctrl = {};

ctrl.ingredients = async (req, res) => {
  const allIngreds = await Ingredient.find();

  res.status(201).json(allIngreds);
};

router.get('/', ctrl.ingredients);

module.exports = router;
