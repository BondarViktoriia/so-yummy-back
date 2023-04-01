const { ShoppingList } = require("../../models");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const { ShoppingListModel } = ShoppingList;

const getShoppingList = async (req, res) => {
  const { _id: owner } = req.user;
  console.log("getShoppingList   owner:", owner);
  const result = await ShoppingListModel.find({ owner });
  console.log("getShoppingList   result:", result);
  res.json(result);
};

module.exports = {
  getShoppingList: ctrlWrapper(getShoppingList),
};
