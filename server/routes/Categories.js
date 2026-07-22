const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const CategoriesController = require("../controllers/CategoriesController");


router.use(validateToken);
router.get("/", CategoriesController.getAll);
router.post("/", CategoriesController.create);
router.get("/:id", CategoriesController.getOne);
router.put("/:id", CategoriesController.update);
router.delete("/:id", CategoriesController.remove);

/*router.get("/", validateToken,async (req, res) => {
   const categories = await Categories.findAll(
    {
       order: [
        ['createdAt', 'DESC'] // Sorts by createdAt column in descending order
      ]
    }
   );
  res.json(categories);
});

router.post("/", validateToken,async (req, res) => 
{
  try 
  {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    const category = await Categories.create({ name });

    res.status(201).json(category); // return the created object
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add category" });
  }
  
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
router.put("/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const category = await Categories.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.name = name;
    await category.save();

    res.json(category); // return the updated object
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update category" });
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
});*/
module.exports = router;