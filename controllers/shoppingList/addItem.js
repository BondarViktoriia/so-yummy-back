const { ShoppingList } = require("../../models");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");

const { ShoppingListModel } = ShoppingList;
const addItem = async (req, res) => {
  const owner = req.user._id;
  const newItem = await ShoppingListModel.create({ ...req.body, owner });
  res.status(201).json({ status: 201, data: newItem });
};

module.exports = {
  addItem: ctrlWrapper(addItem),
};
