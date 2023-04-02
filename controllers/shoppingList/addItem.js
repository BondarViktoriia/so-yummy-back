const { ShoppingListModel } = require("../../models");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");

const { ShoppingList } = ShoppingListModel;

const addItem = async (req, res) => {
  const owner = req.user._id;
  const isExisting = await ShoppingList.findOne({ owner });
  if (isExisting) {
    const newCollection = await ShoppingList.findOneAndUpdate(
      {
        owner,
      },
      { $push: { ingredients: req.body } },
      { returnDocument: "after" }
    );

    res.status(201).json({ status: 201, data: newCollection });
  } else {
    const newCollection = await ShoppingList.create({
      owner,
      ingredients: [req.body],
    });
    res.status(201).json({ status: 201, data: newCollection });
  }
};

module.exports = {
  addItem: ctrlWrapper(addItem),
};
