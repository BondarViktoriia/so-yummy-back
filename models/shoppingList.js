const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");
// const Ingredient = require("./ingredient");

const extendedIngredientSchema = Schema({
  ttl: {
    type: String,
    require: [true, "Set title of ingredient"],
    minlength: 3,
  },
  decs: {
    type: String,
    require: [true, "Set description of ingredient"],
  },
  t: {
    type: String,
    require: [true, "Set tag of ingredient"],
  },

  thb: {
    type: String,
    require: [true, "Set picture of ingredient"],
  },
  measure: {
    type: String,
    required: [true, "Set quantity of ingredient"],
  },
});

const joiVerifyIngredient = Joi.object({
  ttl: Joi.string().required().min(3),
  decs: Joi.string().required(),
  t: Joi.string().required(),
  thb: Joi.string().required(),
  measure: Joi.string().required(),
});

const shoppingListSchema = Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  ingredients: [extendedIngredientSchema],
});

shoppingListSchema.post("save", handleSchemaValidationErrors);

const ShoppingList = model("shoppingList", shoppingListSchema);

module.exports = {
  ShoppingList,
  joiVerifyIngredient,
};
