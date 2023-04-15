const { OwnRecipe } = require("../../models");
const cloudinary = require("cloudinary").v2;
const { RequestError } = require("../../helpers");

 const DEFAULT_RECIPE_IMG_URL= 'https://res.cloudinary.com/dcpsasqw8/image/upload/v1678474415/assets/own_recipes_photos/dafault.png'

const addRecipe = async (req, res) => {
  const { _id: owner } = req.user;

  // const imgPath = req.file.path;
  const imgPath = req.file?req.file.path : DEFAULT_RECIPE_IMG_URL;
  const { ingredients, title, description, category, time, instructions } =
    req.body;

  const fixedIngreds = JSON.parse(ingredients);

  await cloudinary.uploader
    .upload(imgPath, {
      folder: "recipe",
      width: 433,
      height: 332,
      // crop: "pad",
    })
    .then((result) => {
      const thumb = result.secure_url;
      cloudinary.uploader
        .upload(imgPath, {
          folder: "recipe",
          width: 318,
          height: 324,
          crop: "pad",
        })
        .then(async (result) => {
          const preview = result.secure_url;

          const data = await OwnRecipe.create({
            ingredients: fixedIngreds,
            title,
            description,
            category,
            time,
            instructions,
            thumb,
            preview,
            owner,
          });
          return res
            .status(201)
            .json({
              status: "Success",
              code: 201,
              data,
            })
            .catch(() => {
              RequestError(500, "Server error");
            });
        })
        .catch(() => {
          RequestError(500, "Server error");
        });
    });
};

module.exports = addRecipe;
