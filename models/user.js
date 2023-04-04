const { Schema, model } = require("mongoose");
const { handleSchemaError } = require("../helpers");
const Joi = require("joi");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      // default: null,
    },
    avatarURL: {
      type: String,
    },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSchemaError);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
});

const emailSchema = Joi.object({
  email: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const schemas = {
  registerSchema,
  emailSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};

// const { Schema, model } = require("mongoose");
// const Joi = require("joi");

// const userSchema = new Schema(
//   {
//     password: {
//       type: String,
//       required: [true, "Password is required"],
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//     },
//     subscription: {
//       type: String,
//       enum: ["starter", "pro", "business"],
//       default: "starter",
//     },
//     token: {
//       type: String,
//       default: null,
//     },
//     avatarURL: {
//       type: String,
//       required: true,
//     },
//     verify: {
//       type: Boolean,
//       default: false,
//     },
//     verificationToken: {
//       type: String,
//       required: [true, "Verify token is required"],
//     },
//   },
//   { versionKey: false, timestamps: true }
// );

// const joiSignupSchema = Joi.object({
//   password: Joi.string().min(6).required(),
//   email: Joi.string().email().required(),
//   subscription: Joi.string(),
//   token: Joi.string(),
// });
// const joiLoginSchema = Joi.object({
//   password: Joi.string().min(6).required(),
//   email: Joi.string().email().required(),
//   token: Joi.string(),
// });
// const joiSubscriptionSchema = Joi.object({
//   subscription: Joi.string().valid("starter", "pro", "business").required(),
// });
// const joiVerifyEmailSchema = Joi.object({
//   email: Joi.string().email().required(),
// });

// const User = model("user", userSchema);
// const schemas = {
//   joiSignupSchema,
//   joiLoginSchema,
//   joiSubscriptionSchema,
//   joiVerifyEmailSchema,
// };

// module.exports = { User, schemas };
