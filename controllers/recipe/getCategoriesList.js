const path = require("path");
const categoriesList = require(path.join(
  __dirname,
  "..",
  "..",
  "data",
  "categoriesArray"
));

const getCategoriesList = async (req, res) => {
  return res.status(200).json({ categoriesList: categoriesList.sort() });
};

module.exports = { getCategoriesList };
