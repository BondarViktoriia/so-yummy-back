const express = require("express");
const { getFavorite } = require("../../controllers/recipe");
const { auth } = require("../../middlewares");

const router = express.Router();

router.get("/favorite", auth, getFavorite);

module.exports = router;
