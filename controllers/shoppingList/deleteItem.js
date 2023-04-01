const { shoppingList } = require("../../models");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const RequestError = require("../../helpers/RequestError");
const { isValidObjectId } = require("mongoose");

const { ShoppingListModel } = shoppingList;

const deleteItem = async (req, res, next) => {
  const id = req.params.itemId;
  if (!isValidObjectId(id)) {
    next(RequestError(400, `${id} is not valid id!`));
  }
  const owner = req.user._id;
  const deletedItem = await ShoppingListModel.findOneAndUpdate(
    {
      owner,
    },
    { $pull: { ingredients: { _id: id } } }
  );
  if (!deletedItem) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({ message: "Item deleted from shopping list" });
};

module.exports = {
  deleteItem: ctrlWrapper(deleteItem),
};
