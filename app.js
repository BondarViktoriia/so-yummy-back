const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const dotenv = require("dotenv");

dotenv.config();

const authRouter = require("./routes/api/auth");
const subscribeRouter = require("./routes/api/subscribe");
const recipesRouter = require("./routes/api/recipes");
const ingredientsRouter = require("./routes/api/ingredients");
const ownRecipiesRouter = require("./routes/api/ownRecipes");
const favoriteRouter = require("./routes/api/favorite");
const popularRecipeRouter = require("./routes/api/popularRecipe");
const shoppingListRouter = require("./routes/api/shoppingList");
const searchRouter = require("./routes/api/search");
const categoriesList = require("./data/categoriesArray");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/subscribe", subscribeRouter);

app.use("/api/recipes", recipesRouter);
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/ownRecipes", ownRecipiesRouter);
app.use("/api/favorite", favoriteRouter);
app.use("/api/popular-recipe", popularRecipeRouter);
app.use("/api/shoppingList", shoppingListRouter);
app.use("/api/search", searchRouter);
app.get("/api/recipes/category-list", (req, res) => {
  res.json(categoriesList.sort());
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
