const { RawMaterials } = require("../models");
const asyncHandler = require("../middlewares/asyncHandler");


const getAll = asyncHandler(async (req, res) => 
{

  const rawMaterials = await RawMaterials.findAll({
      order: [['createdAt', 'DESC']]
  });
  if (!rawMaterials) {
    const err = new Error("Raw material not found");
    err.status = 404;
    throw err;
  }
  res.json(rawMaterials);
 
});

const getOne = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const rawMaterial = await RawMaterials.findByPk(id);
  if (!rawMaterial) 
  {
    const err = new Error("Raw material not found");
    err.status = 404;
    throw err;
  }
  res.json(rawMaterial);
 
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

  const rawMaterial = await RawMaterials.create({ name });

  res.status(201).json(rawMaterial); 
  
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
  const rawMaterial = await RawMaterials.findByPk(id);
  if (!rawMaterial) 
  {
    const err = new Error("Raw material not found");
    err.status = 400;
    throw err;
  }

  await rawMaterial.destroy();
  res.json({ message: "Raw material deleted successfully" });
} 
);

module.exports = { getAll, getOne, create, update, remove };