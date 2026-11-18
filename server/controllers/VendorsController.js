const { Vendors } = require("../models");
const asyncHandler = require("../middlewares/asyncHandler");


const getAll = asyncHandler(async (req, res) => 
{

  const vendors = await Vendors.findAll({
      order: [['createdAt', 'DESC']]
  });
  if (!vendors) {
    const err = new Error("Vendor not found");
    err.status = 404;
    throw err;
  }
  res.json(vendors);
 
});

const getOne = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const vendors = await Vendors.findByPk(id);
  if (!vendors) 
  {
    const err = new Error("Vendor not found");
    err.status = 404;
    throw err;
  }
  res.json(vendors);
 
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

  const vendors = await Vendors.create({ name });

  res.status(201).json(vendors); 
  
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
  const vendors = await Vendors.findByPk(id);

  if (!vendors) 
  {
    const err = new Error("Vendor not found");
    err.status = 400;
    throw err;
  }

  vendors.name = name;
  await vendors.save();

  res.json(vendors); // return the updated object
  
});

const remove = asyncHandler(async (req, res) => 
{
  const id = req.params.id;
  const vendors = await Vendors.findByPk(id);
  if (!vendors) 
  {
    const err = new Error("Vendor not found");
    err.status = 400;
    throw err;
  }

  await vendors.destroy();
  res.json({ message: "Vendor deleted successfully" });
} 
);

module.exports = { getAll, getOne, create, update, remove };