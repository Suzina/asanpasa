const { Products } = require("../models");
const { Users } = require("../models");
const { Orders } = require("../models");
const slugify = require("slugify");

const asyncHandler = require("../middlewares/asyncHandler");

const getAll = asyncHandler(async (req, res) => 
{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Orders.findAndCountAll({
        order: [['createdAt', 'DESC']],
        limit,
        offset,
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

    res.json({
        items: rows,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
    });
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
    const { fullname,address,phonenumber,total_amt,advance,amt_due } = req.body;

     
   
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
    order.total_amt = total_amt;
    order.advance = advance;
    order.amt_due = amt_due;
    await order.save();

    res.json(order); 
});

const remove = asyncHandler(async (req, res) => 
{
    const id = req.params.id;
    const order = await Orders.findByPk(id);
    if (!order) 
    {
        const err = new Error("Order not found");
        err.status = 400;
        throw err;
    }

    await order.destroy();
    res.json({ message: "Order deleted successfully" });
});

module.exports = { getAll, getOne, create, update, remove };