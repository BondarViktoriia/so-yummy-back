const recipe = require("./recipe");
const { getShoppingList } = require("./shoppingList");
const shoppingListCtrls = require("./shoppingList");
const ingredient = require("./ingredients")

module.exports = {
  shoppingListCtrls,
  recipe,
  getShoppingList,
  ingredient
};
