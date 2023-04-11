const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSchemaError } = require("../helpers");

const recipeSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
    },

    // Recipe name (Назва рецепту)
    title: {
      type: String,
      required: [true, "Write title for your recepie"],
    },
    // Recipe description (Опис рецепту)
    description: {
      type: String,
      required: [true, "Write description for your recepie"],
    },
    // Small recipe image (Картинка для сторінок з відобрежженням декількох рецептів)
    preview: {
      type: String,
      //   required: true,
    },

    // Large image for page of certain recipe
    // (Картинка для сторінки одного рецепту)

    thumb: {
      type: String,
    },
    // Recipe category (Категорія рецепту)
    category: {
      type: String,
      required: [true, "Set category for your recepie"],
    },
    // Time for cooking (Час на приготування)
    time: {
      type: String,
      required: [true, "Set cooking time for your recepie"],
    },
    // Ingredients for recipe (Інградієнти для рецепту)
    ingredients: [
      {
        _id: false,
        // Ingredient id (ID інградієнту)
        id: {
          type: Schema.Types.ObjectId,
          ref: "ingred",
        },
        // Ingradient quantity (Кількість інградієнту)
        measure: {
          type: String,
          required: true,
        },
      },
    ],
    // Recipe preparation (Приготування рецепту)
    instructions: {
      type: String,
      required: [true, "Write your instructions"],
    },
    // User who created this recipe (Користувач що створив рецепт)
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      // required: true,
    },
    // Users who added this recipe to their favorites (Користувачі що додали рецепт до вибраного)
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    // Recipe popularity (популярність рецепту)
    popularity: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

recipeSchema.post("save", handleSchemaError);

const addSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required().messages({
    "string.empty": `Recipe description cannot be empty`,
    "any.required": `Recipe description is required`,
  }),

  thumb: Joi.string().messages({
    "string.empty": `Recipe image cannot be empty`,
    "any.required": `Recipe image is required`,
  }),
  preview: Joi.string().messages({
    "string.empty": `Recipe image cannot be empty`,
    "any.required": `Recipe image is required`,
  }),
  category: Joi.string().required().messages({
    "string.empty": `Recipe category cannot be empty`,
    "any.required": `Recipe category is required`,
  }),
  time: Joi.string().required().messages({
    "string.empty": `Recipe time cannot be empty`,
    "any.required": `Recipe time is required`,
  }),
  ingredients: Joi.string().required().messages({
    "string.empty": `Recipe ingradients cannot be empty`,
    "any.required": `Recipe ingradients is required`,
  }),
  instructions: Joi.string().required().messages({
    "string.empty": `Recipe preparation cannot be empty`,
    "any.required": `Recipe preparation is required`,
  }),
});

const Recipe = model("recipes", recipeSchema);
const OwnRecipe = model("ownRecipes", recipeSchema, "ownRecipies");
const PopularRecipe = model("popularRecipes", recipeSchema, "popularRecipe");

module.exports = {
  addSchema,
  Recipe,
  OwnRecipe,
  PopularRecipe,
};
