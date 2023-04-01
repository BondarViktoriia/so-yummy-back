const { ShoppingList } = require("../models/shoppingList");
const ctrlWrapper = require("../middelwares/ctrlWrapper");

const getShoppingList = async (req, res) => {
  const { _id: owner } = req.user;
  console.log("getShoppingList   owner:", owner);
  const result = await ShoppingList.find({ owner: "642098424a3f87c8f4913ecc" });
  console.log("getShoppingList   result:", result);
  res.json(result);
};

module.exports = {
  getShoppingList: ctrlWrapper(getShoppingList),
};
