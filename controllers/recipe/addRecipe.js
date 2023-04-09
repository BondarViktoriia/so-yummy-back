const { OwnRecipe } = require("../../models");
const cloudinary = require("cloudinary").v2;
const { RequestError } = require("../../helpers");

const addRecipe = async (req, res) => {
  const { _id: owner } = req.user;

  const imgPath = req.file.path;
  console.log("addRecipe   req.file:", req.file.path);
  console.log("addRecipe   req.body:", req.body);
  console.log("addRecipe   req.user:", req.user);
  const { ingredients } = req.body;
  console.log("addRecipe   ingredients:", ingredients);

  if (typeof ingredients === "string") {
    req.body.ingredients = ingredients.split(",");
    console.log("addRecipe   req.body.ingredients:", req.body.ingredients);
  }

  try {
    const thumb = await cloudinary.uploader
      .upload(imgPath, {
        folder: "recipe",
        width: 200,
        height: 200,
      })
      .then((result) => {
        const thumb = result.secure_url;
        return thumb;
      });

    const preview = cloudinary.uploader
      .upload(imgPath, {
        folder: "recipe",
        width: 100,
        height: 100,
      })
      .then((result) => {
        const preview = result.secure_url;
        return preview;
      });

    const data = await OwnRecipe.create({
      ...req.body,
      thumb,
      preview,
      owner,
    });
    console.log(".then   data:", data);
    return res.status(201).json({
      status: "Success",
      code: 201,
      data,
    });
  } catch (error) {
    throw RequestError(500, "Server error");
  }
};

module.exports = addRecipe;
