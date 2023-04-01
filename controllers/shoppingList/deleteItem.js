const { ShoppingList } = require("../../models");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const RequestError = require("../../helpers/RequestError");
const { isValidObjectId } = require("mongoose");

const { ShoppingListModel } = ShoppingList;

const deleteItem = async (req, res, next) => {
  const id = req.params.itemId;
  console.log("deleteItem   id:", id);
  if (!isValidObjectId(id)) {
    next(RequestError(400, `${id} is not valid!`));
  }
  const deletedItem = await ShoppingListModel.findByIdAndRemove({ _id: id });
  if (!deletedItem) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({ message: "Item deleted from shopping list" });
};

module.exports = {
  deleteItem: ctrlWrapper(deleteItem),
};
