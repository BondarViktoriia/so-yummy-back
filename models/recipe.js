const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSchemaError } = require("../helpers");

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Write title for your recepie"],
    },
    descr: {
      type: String,
      required: [true, "Write description for your recepie"],
    },
    previewImg: {
      type: String,
      required: true,
    },
    largeImg: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: [true, "Set category for your recepie"],
    },
    time: {
      type: String,
      required: [true, "Set cooking time for your recepie"],
    },
    ingredients: [
      {
        id: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        measure: {
          type: String,
          required: true,
        },
      },
    ],
    preparation: {
      type: String,
      required: [true, "Write your recepie"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    popularity: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

recipeSchema.post("save", handleSchemaError);

const addSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": `Recipe title cannot be empty`,
    "any.required": `Recipe title is required`,
  }),
  descr: Joi.string().required().messages({
    "string.empty": `Recipe description cannot be empty`,
    "any.required": `Recipe description is required`,
  }),
  imgURL: Joi.string().required().messages({
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
  preparation: Joi.string().required().messages({
    "string.empty": `Recipe preparation cannot be empty`,
    "any.required": `Recipe preparation is required`,
  }),
});

const Recipe = model("recipes", recipeSchema);

module.exports = {
  addSchema,
  Recipe,
};
