const { Recipe } = require("../../models");

const getRecipeMain = async (req, res) => {
  const result = [];
  const chicken = {
    category: "Chicken",
    results: await Recipe.find(
      {
        category: ["Chicken"],
      },
      "-createdAt -updatedAt"
    ).limit(4),
  };
  result.push(chicken);

  const breakfast = {
    category: "Breakfast",
    results : await Recipe.find(
      {
        category: ["Breakfast"],
      },
      "-createdAt -updatedAt"
    ).limit(4),
  };
  result.push(breakfast);

  const desserts = {
    category: "Desserts",
    results: await Recipe.find(
      {
        category: ["Dessert"],
      },
      "-createdAt -updatedAt"
    ).limit(4),
  };
  result.push(desserts);

  const miscellaneous = {
    category: "Miscellaneous",
    results: await Recipe.find(
      {
        category: ["Miscellaneous"],
      },
      "-createdAt -updatedAt"
    ).limit(4),
  }

  result.push(miscellaneous);

  res.status(200).json(result);
};

module.exports = {
  getRecipeMain,
};
