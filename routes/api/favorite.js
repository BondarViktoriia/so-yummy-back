const express = require("express");
const {
  getFavorite,
  addToFavorite,
  deleteFromFavorite,
} = require("../../controllers/recipe");
const { auth } = require("../../middlewares");

const router = express.Router();

router.get("/", auth, getFavorite);
router.put("/:id", auth, addToFavorite);
router.patch("/:id", auth, deleteFromFavorite);

module.exports = router;
