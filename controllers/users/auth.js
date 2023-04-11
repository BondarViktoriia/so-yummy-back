const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { v4: uuidv4 } = require("uuid");

const { RequestError } = require("../../helpers");

const { ctrlWrapper } = require("../../middlewares");

const { SECRET_KEY } = process.env;

const { defaultAva } = require("./default");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatar = req.file?.path || defaultAva;
  const verificationToken = uuidv4();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
    avatar,
  });

  // const verifyEmail = {
  //   to: email,
  //   subject: "Verify email",
  //   html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
  // };

  // await sendEmail(verifyEmail);

  res.status(201).json({
    message: "new user created",
    user: {
      email: newUser.email,
      name: newUser.name,
      avatar: newUser.avatar,
    },
  });
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email is not verified");
  }

  // if (!user.verify) {
  //   throw RequestError(401, "Email or password invalid");
  // }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    message: "Login successful",
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, password } = req.user;

  res.json({
    email,
    password,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  // const user = await User.findByIdAndUpdate(_id, { token: null });
  const user = await User.findById(_id);
  console.log(user);
  user.token = null;
  await user.save();
  res.json({
    message: "Logout success",
  });
};

// const updateAvatar = async (req, res) => {
//   const { _id } = req.user;
//   const { path: tempUpload, originalname } = req.file;
//   const filename = `${_id}_${originalname}`;

//   const resultUpload = path.join(avatarsDir, filename);

//   const image = await Jimp.read(tempUpload);
//   await image.resize(250, 250).writeAsync(tempUpload);

//   await fs.rename(tempUpload, resultUpload);
//   const avatarURL = path.join("avatars", filename);

//   await User.findByIdAndUpdate(_id, { avatarURL });

//   res.json({
//     avatarURL,
//   });
// };

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const avatarURL = req.file?.path;

  const user = await User.findById({ _id });

  if (!avatarURL) {
    user.name = req.body.name;
    user.save();

    res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          name: req.body.name,
          avatar: user.avatar,
        },
      },
    });
  } else {
    user.name = req.body.name;
    user.avatar = avatarURL;
    user.save();

    res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          name: req.body.name,
          avatar: avatarURL,
        },
      },
    });
  }
};

module.exports = {
  signup: ctrlWrapper(signup),
  // verifyEmail: ctrlWrapper(verifyEmail),
  // resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUser: ctrlWrapper(updateUser),
};
