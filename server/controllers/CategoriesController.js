const { Categories } = require("../models");


const getAll = async (req, res) => {
  try {
    const categories = await Categories.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

const getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Categories.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
const create = async (req, res) => {
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
}
const update = async (req, res) => {
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
}
const remove = async (req, res) => {
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
}

module.exports = { getAll, getOne, create, update, remove };