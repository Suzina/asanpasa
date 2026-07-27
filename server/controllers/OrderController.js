const { Products } = require("../models");
const { Users } = require("../models");
const { Orders } = require("../models");
const slugify = require("slugify");

const asyncHandler = require("../middlewares/asyncHandler");

const getAll = asyncHandler(async (req, res) => 
{
    const orders = await Orders.findAll({
        order: [['createdAt', 'DESC']],
        include: {
            model: Products,
            as: "product",       // must match the alias in Products.belongsTo
            attributes: ["id", "name"]  // only pull what you need
            },
        });
    if (!orders) 
    {
        const err = new Error("Orders not found");
        err.status = 404;
        throw err;
    }
    res.json(orders);
});

const getOne = asyncHandler(async (req, res) => 
{
    const id = req.params.id;
    const order = await Orders.findByPk(id);
    if (!order) 
    {
        const err = new Error("Order not found");
        err.status = 404;
        throw err;
    }
    res.json(order);
});

const create = asyncHandler(async (req, res) => 
{
    const { product_id,fullname,address,phonenumber,total_amt,advance,user_id } = req.body;

    if (!product_id || !fullname.trim() || !fullname || !address || !phonenumber || !total_amt || !advance|| !user_id) 
    {
        const err = new Error("Field is required");
        err.status = 400;
        throw err;
    }

    let amt_due=total_amt-advance;

    const order = await Orders.create({
        product_id,
        fullname,
        address,
        phonenumber,
        total_amt,
        advance,
        amt_due,
        user_id
    });
   const orderWithProduct = await Orders.findByPk(order.id, {
    include: [
        {
            model: Products,
            as: "product",   // must match alias in Orders.belongsTo(Products)
            attributes: ["name"],
        },
        {
            model: Users,
            as: "user",       // must match alias in Orders.belongsTo(Users)
            attributes: ["username"],
        },
    ],
});
    res.status(201).json(orderWithProduct); 
});

const update = asyncHandler(async (req, res) => 
{
    const id = req.params.id;
    const { product_id,fullname,address,phonenumber,total_amt,advance,amt_due } = req.body;

     if (!product_id || !fullname.trim() || !fullname || !address || !phonenumber || !total_amt || !advance|| !amt_due) 
    {
        const err = new Error("Field is required");
        err.status = 400;
        throw err;
    }
   
    const order = await Orders.findByPk(id);

    if (!order) 
    {
        const err = new Error("Order not found");
        err.status = 400;
        throw err;
    }

    order.fullname = fullname;
    order.address = address;
    order.phonenumber = phonenumber;
    order.slug = slug;

    await product.save();

    res.json(product); 
});

const remove = asyncHandler(async (req, res) => 
{
    const id = req.params.id;
    const product = await Products.findByPk(id);
    if (!product) 
    {
        const err = new Error("Product not found");
        err.status = 400;
        throw err;
    }

    await product.destroy();
    res.json({ message: "Product deleted successfully" });
});

module.exports = { getAll, getOne, create, update, remove };