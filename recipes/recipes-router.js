const express = require("express");

const db = require("./recipes-model.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const recipes = await db.find();
    if (recipes) {
      res.status(200).json(recipes);
    }
  } catch (error) {
    res.status(500).json({ message: `Recipes could not be found ${error}.` });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await db.findById(id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res
        .status(404)
        .json({ message: "Recipe with specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: `Recipe request failed ${error}.` });
  }
});

router.post("/", async (req, res) => {
  const recipe = req.body;
  if (!recipe.name) {
    res.status(400).json({ message: "Please enter a valid recipe name." });
  } else {
    try {
      const newrecipe = await db.create(recipe);
      if (newrecipe) {
        res.status(201).json(newrecipe);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Your recipe could not be posted ${error}.` });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await db.remove(id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res
        .status(404)
        .json({ message: "The recipe with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({
      message: `The recipe's information could not be modified: ${error}.`
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const newRecipe = req.body;

  if (!newRecipe.name) {
    res.status(400).json({ message: "Please enter a valid recipe name." });
  } else {
    try {
      const editedRecipe = await db.update(newRecipe, id);
      if (editedRecipe) {
        res.status(200).json(editedRecipe);
      } else {
        res.status(404).json({
          message: "The recipe with the specified ID does not exist."
        });
      }
    } catch (error) {
      res.status(500).json({
        message: `The recipe's information could not be modified: ${error}.`
      });
    }
  }
});

module.exports = router;
