const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/ingredientsCtrl');

router.get('/list', ctrl.ingredientsAll);

router.get('/ingredient', ctrl.receipeByIngredient);

module.exports = router;
