const { ShoppingListModel } = require("../../models");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");

// const { ShoppingListModel } = shoppingList;

const addItem = async (req, res) => {
  const owner = req.user._id;
  const isExisting = await ShoppingListModel.findOne({ owner });
  if (isExisting) {
    const newCollection = await ShoppingListModel.findOneAndUpdate(
      {
        owner,
      },
      { $push: { ingredients: req.body } },
      { returnDocument: "after" }
    );

    res.status(201).json({ status: 201, data: newCollection });
  } else {
    const newCollection = await ShoppingListModel.create({
      owner,
      ingredients: [req.body],
    });
    res.status(201).json({ status: 201, data: newCollection });
  }
};

module.exports = {
  addItem: ctrlWrapper(addItem),
};
