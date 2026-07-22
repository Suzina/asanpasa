const { Products } = require("../models");
const asyncHandler = require("../middlewares/asyncHandler");

const getAll = asyncHandler(async (req, res) => 
{
    const products = await Products.findByPk(req.params.id);
    if (!products) {
        const err = new Error("Products not found");
        err.status = 404;
        throw err;
    }
    res.json(products);
});

const getOne = asyncHandler(async (req, res) => 
{
    const id = req.params.id;
    const product = await Products.findByPk(id);
    if (!product) 
    {
        const err = new Error("Product not found");
        err.status = 404;
        throw err;
    }
    res.json(product);
});

const create = asyncHandler(async (req, res) => 
{
   
});

const update = asyncHandler(async (req, res) => 
{
   
});
const remove = asyncHandler(async (req, res) => 
{
   
});
module.exports = { getAll, getOne, create, update, remove };