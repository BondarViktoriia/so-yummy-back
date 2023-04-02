const { RequestError } = require("../../helpers");
const { Recipe } = require("../../models");

const getOwnerRecipes = async(req, res) => {
    const { _id: owner } = req.user;
    const data = await Recipe.find({ owner });
    if (!data) {
        throw RequestError(404, "Not found");
    }
    res.json({ code: 200, status: "Success", data });
};

module.exports = getOwnerRecipes;