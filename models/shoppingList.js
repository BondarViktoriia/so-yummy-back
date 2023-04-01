const { Schema, model } = require("mongoose");
const Joi = require("joi");

const IngredientSchema = Schema({
  ingredientName: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

const joiVerifyIngredient = Joi.object({
  ingredientName: Joi.string().required(),
  quantity: Joi.string().required(),
});

const shoppingListSchema = Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  ingredients: {
    type: [IngredientSchema],
    default: undefined,
  },
});

const ShoppingList = model("shoppingList", shoppingListSchema);

module.exports = {
  ShoppingList,
  joiVerifyIngredient,
};
