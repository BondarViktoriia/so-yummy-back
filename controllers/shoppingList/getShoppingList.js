const { ShoppingList } = require("../../models");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const { ShoppingListModel } = ShoppingList;

const getShoppingList = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await ShoppingListModel.find({ owner });
  res.json(result);
};

module.exports = {
  getShoppingList: ctrlWrapper(getShoppingList),
};
