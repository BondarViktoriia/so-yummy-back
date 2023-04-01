const express = require("express");

const router = express.Router();

const { shoppingListCtrls } = require("../../controllers");
const { auth, validation } = require("../../middlewares");
const { ShoppingListModel } = require("../../models");
const { getShoppingList, deleteItem, addItem } = shoppingListCtrls;

const { joiVerifyIngredient } = ShoppingListModel;

router.get("/", auth, getShoppingList);
router.delete("/:itemId", auth, deleteItem);
router.post("/", auth, validation(joiVerifyIngredient), addItem);

module.exports = router;
