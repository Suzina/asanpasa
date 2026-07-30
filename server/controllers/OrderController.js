const { Products } = require("../models");
const { Users } = require("../models");
const { Orders } = require("../models");
const { OrderItem } = require("../models");


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
    const { items,fullname,address,phonenumber,total_amt,advance } = req.body;
    const user_id = req.user.id; 
    if (!fullname || !address || !phonenumber || !total_amt || !advance) 
    {
        const err = new Error("Required fields are missing");
        err.status = 400;
        throw err;
    }

    let amt_due=total_amt-advance;

    const order = await Orders.create({
        fullname,
        address,
        phonenumber,
        total_amt,
        advance,
        amt_due,
        user_id
    });

    const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        qty: item.qty,
        price: item.price,
        user_id
    }));

    await OrderItem.bulkCreate(orderItems);

   const orderWithProduct = await Orders.findByPk(order.id, {
    include: [
        {
            model: Products,
            as: "products",   
            attributes: ["name"],
        },
        {
            model: Users,
            as: "user",       
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