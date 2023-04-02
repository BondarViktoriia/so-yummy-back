const express = require("express");
const { getFavorite, addToFavorite } = require("../../controllers/recipe");
const { auth } = require("../../middlewares");

const router = express.Router();

router.get("/favorite", auth, getFavorite);
router.patch("/favorite/:id", auth, addToFavorite);

module.exports = router;
