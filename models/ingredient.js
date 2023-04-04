const { Schema, model } = require('mongoose');

const ingredientSchema = Schema(
  {
    ttl: {
      type: String,
      require: [true, 'Set title of ingredient'],
      minlength: 3,
    },
    decs: {
      type: String,
      require: [true, 'Set description of ingredient'],
    },
    t: {
      type: String,
      require: [true, 'Set tag of ingredient'],
    },

    thb: {
      type: String,
      require: [true, 'Set picture of ingredient'],
    },
  },
  { versionKey: false, timeStamps: true }
);

const Ingredient = model('ingred', ingredientSchema);

module.exports = Ingredient;
