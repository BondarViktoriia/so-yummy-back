const { Recipe } = require("../../models");
const cloudinary = require("cloudinary").v2;
const { RequestError } = require("../../helpers");

const addRecipe = async (req, res) => {
  const { _id: owner } = req.user;
  const imgPath = req.body.imgURL;

  await cloudinary.uploader
    .upload(imgPath, {
      folder: "recipe",
      width: 200,
      height: 200,
    })
    .then((result) => {
      const thumb = result.secure_url;
      cloudinary.uploader
        .upload(imgPath, {
          folder: "recipe",
          width: 100,
          height: 100,
        })
        .then(async (result) => {
          const preview = result.secure_url;
          const data = await Recipe.create({
            ...req.body,
            thumb,
            preview,
            owner,
          });
          return res.status(201).json({
            status: "Success",
            code: 201,
            data,
          });
        })
        .catch(() => {
          RequestError(500, "Server error");
        });
    })
    .catch(() => {
      RequestError(500, "Server error");
    });
};

module.exports = addRecipe;
