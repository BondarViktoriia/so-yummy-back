const { shoppingList } = require("../../models");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");

const { ShoppingListModel } = shoppingList;

const addItem = async (req, res) => {
  const owner = req.user._id;
  const newItem = await ShoppingListModel.findOneAndUpdate(
    {
      owner,
    },
    { $push: { ingredients: req.body } }
  );

  res.status(201).json({ status: 201, data: newItem });
};

module.exports = {
  addItem: ctrlWrapper(addItem),
};
