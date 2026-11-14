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
  const vendor = await Vendors.findByPk(id);
  if (!vendor) 
  {
    const err = new Error("Vendor not found");
    err.status = 404;
    throw err;
  }
  res.json(vendor);
 
});

module.exports = { getAll, getOne };