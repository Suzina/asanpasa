const { Categories } = require("../models");
const asyncHandler = require("../middlewares/asyncHandler");


const getAll = asyncHandler(async (req, res) => 
{

  const categories = await Categories.findAll({
      order: [['createdAt', 'DESC']]
  });
  if (!categories) {
    const err = new Error("Category not found");
    err.status = 404;
    throw err;
  }
  res.json(categories);
 
});

const getOne = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await Categories.findByPk(id);
  if (!category) 
  {
    const err = new Error("Category not found");
    err.status = 404;
    throw err;
  }
  res.json(category);
 
});
const create = asyncHandler(async (req, res)=> 
{
  
  const { name } = req.body;

  if (!name || !name.trim()) 
  {
    const err = new Error("Name is required");
    err.status = 400;
    throw err;
  }

  const category = await Categories.create({ name });

  res.status(201).json(category); 
  
});

const update = asyncHandler(async (req, res) => 
{
  const id = req.params.id;
  const { name } = req.body;

  if (!name || !name.trim()) 
  {
    const err = new Error("Name is required");
    err.status = 400;
    throw err;
  }
  const category = await Categories.findByPk(id);

  if (!category) 
  {
    const err = new Error("Category not found");
    err.status = 400;
    throw err;
  }

  category.name = name;
  await category.save();

  res.json(category); // return the updated object
  
});

const remove = asyncHandler(async (req, res) => 
{
  const id = req.params.id;
  const category = await Categories.findByPk(id);
  if (!category) 
  {
    const err = new Error("Category not found");
    err.status = 400;
    throw err;
  }

  await category.destroy();
  res.json({ message: "Category deleted successfully" });
} 
);

module.exports = { getAll, getOne, create, update, remove };