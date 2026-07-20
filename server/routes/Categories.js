const express = require("express");
const router = express.Router();
const { Categories } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", validateToken,async (req, res) => {
   const categories = await Categories.findAll();
  res.json(categories);
});

router.post("/", validateToken,async (req, res) => {
  const { name } = req.body;
  Categories.create({
      name: name
    });
    res.json("Category added successful");
});

router.get("/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Categories.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  try 
  {
    const category = await Categories.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await category.destroy();
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;