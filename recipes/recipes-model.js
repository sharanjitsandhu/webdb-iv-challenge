const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findById,
  create,
  remove,
  update
};

async function find() {
  const recipes = await db("recipes")
    .select({ id: "recipes.id", name: "recipes.name", dish: "dishes.name" })
    .innerJoin("dishes", "dishes.id", "recipes.dish_id");
  return recipes;
}

async function findById(id) {
  const recipe = await db("recipes")
    .select({
      id: "recipes.id",
      name: "recipes.name",
      dish: "dishes.name"
    })
    .innerJoin("dishes", "dishes.id", "recipes.dish_id")
    .where({ "recipes.id": id })
    .first();
  recipe.ingredients = await db("recipes")
    .select({
      ingredients: "ingredients.name"
    })
    .innerJoin(
      "recipe_ingredients",
      "recipe_ingredients.recipe_id",
      "recipes.id"
    )
    .innerJoin(
      "ingredients",
      "ingredients.id",
      "recipe_ingredients.ingredients_id"
    )
    .where({ "recipes.id": id })
    .pluck("ingredients.name");
  return recipe;
}

async function create(item) {
  const [id] = await db("recipes").insert(item);
  if (id) {
    const recipe = await findById(id);
    return recipe;
  }
}

async function remove(id) {
  const recipe = await findById(id);
  if (recipe) {
    const deleted = await db("recipes")
      .where({ id })
      .del();
    if (deleted) {
      return recipe;
    }
  }
}

async function update(item, id) {
  const editedRecipe = await db("recipes")
    .where({ id })
    .update(item);
  if (editedRecipe) {
    const recipe = await findById(id);
    return recipe;
  }
}
