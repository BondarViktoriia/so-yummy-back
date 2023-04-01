const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");
const Ingredient = require("./ingredient");

const extendedIngredientSchema = new Schema(
  Object.assign(Object.create(Ingredient), {
    quantity: {
      type: String,
      required: [true, "Set quantity of ingredient"],
    },
  })
);

console.log("extendedIngredientSchema", extendedIngredientSchema);
const joiVerifyIngredient = Joi.object({
  ingredientName: Joi.string().required(),
  quantity: Joi.string().required(),
  image: Joi.string().required(),
});

const shoppingListSchema = Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  ingredients: [{ type: extendedIngredientSchema, ref: "Ingredient" }],
});

shoppingListSchema.post("save", handleSchemaValidationErrors);

const ShoppingList = model("shoppingList", shoppingListSchema);

module.exports = {
  ShoppingList,
  joiVerifyIngredient,
};
