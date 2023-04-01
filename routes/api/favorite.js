const express = require("express");
const { getFavorite } = require("../../controllers/recipe");

const router = express.Router();

router.get("/favorite", getFavorite);

module.exports = router;
