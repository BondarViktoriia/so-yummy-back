const { Recipe } = require("../../models");

const addRecipe = async(req, res) => {
    const { _id: owner } = req.user;
    const data = await Recipe.create({...req.body, owner });

    res.status(201).json({
        status: "Success",
        code: 201,
        data,
    });
};

module.exports = addRecipe;