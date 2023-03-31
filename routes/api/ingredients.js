const express = require('express');

const router = express.Router();

const Ingredient = require('../../models/ingredient');

const ctrl = require('../../controllers/ingredientsCtrl');

router.get('/', ctrl.ingredientsAll);

module.exports = router;
