const recipe = require("./recipe");
const { getShoppingList } = require("./shoppingList");
const shoppingListCtrls = require("./shoppingList");
const ingredient = require("./ingredients");
const auth = require("./users/auth");

module.exports = {
  shoppingListCtrls,
  recipe,
  getShoppingList,
  ingredient,
  auth,
};
