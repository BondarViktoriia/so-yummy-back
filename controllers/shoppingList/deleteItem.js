// const { shoppingList } = require("../../models");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const RequestError = require("../../helpers/RequestError");
const { isValidObjectId } = require("mongoose");

const { ShoppingListModel } = require("../../models");
const { ShoppingList } = ShoppingListModel;

const deleteItem = async (req, res, next) => {
  const id = req.params.itemId;
  if (!isValidObjectId(id)) {
    next(RequestError(400, `${id} is not valid id!`));
  }
  const owner = req.user._id;
  const updatedList = await ShoppingList.findOneAndUpdate(
    {
      owner,
    },
    { $pull: { ingredients: { _id: id } } },
    { returnDocument: "after" }
  );
  if (!updatedList) {
    throw RequestError(404, "Not found");
  }
  res
    .status(200)
    .json({ message: "Item deleted from shopping list", data: updatedList });
};

module.exports = {
  deleteItem: ctrlWrapper(deleteItem),
};
