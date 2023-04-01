const express = require("express");

const router = express.Router();

const { getShoppingList } = require("../../controllers");

router.get("/", getShoppingList);



module.exports = router;
