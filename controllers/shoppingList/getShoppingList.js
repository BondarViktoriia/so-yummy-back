// const { ShoppingList } = require("../../models");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const { ShoppingListModel } = require("../../models");
const { ShoppingList } = ShoppingListModel;

const getShoppingList = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await ShoppingList.find({ owner });
  res.json(result);
};

module.exports = {
  getShoppingList: ctrlWrapper(getShoppingList),
};
