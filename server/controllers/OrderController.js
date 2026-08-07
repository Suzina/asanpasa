const { Products } = require("../models");
const { Users } = require("../models");
const { Orders } = require("../models");
const { OrderItem } = require("../models");
const { Op } = require('sequelize');

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
            as: "user",      
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
    const order = await Orders.findByPk(id, {
        include: [
            {
                model: Users,
                as: "user",       
                attributes: ["username"],
                required: true,  
            },
             {
                model: OrderItem,
                as: "orderItems",          // must match alias in Orders.hasMany(OrderItems, { as: "items" })
                required: false,      // false = still return order even if it has 0 items
                include: [
                    {
                        model: Products,
                        as: "product", // must match alias in OrderItems.belongsTo(Products, { as: "product" })
                        attributes: ["name"], // adjust to whatever columns you need
                    },
                ],
            },
        ],
    });
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
    const { items,fullname,address,phonenumber,total_amt,advance,shipping_cost,delivery_date } = req.body;
    const user_id = req.user.id; 
    if (!fullname || !address || !phonenumber || !total_amt || !advance || !shipping_cost) 
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
        shipping_cost,
        user_id,
        delivery_date
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
    const { fullname,address,phonenumber,total_amt,advance,amt_due,status } = req.body;

    const order = await Orders.findByPk(id);

    if (!order) 
    {
        const err = new Error("Order not found");
        err.status = 400;
        throw err;
    }
    if (fullname !== undefined) order.fullname = fullname;
    if (address !== undefined) order.address = address;
    if (phonenumber !== undefined) order.phonenumber = phonenumber;
    if (total_amt !== undefined) order.total_amt = total_amt;
    if (advance !== undefined) order.advance = advance;
    if (amt_due !== undefined) order.amt_due = amt_due;
    if (status !== undefined) order.status = status;

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

const getUpcommingOrders = asyncHandler(async (req, res) => 
{
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const todayStr = today.toISOString().split('T')[0];       // "2026-08-07"
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const orders = await Orders.findAll({
        where: {
            delivery_date: {
                [Op.in]: [todayStr, tomorrowStr]
            },
            status: 'Pending'
        },
        order: [['delivery_date', 'ASC']],
    });

    res.json({
        items: orders,
        totalItems: orders.length
    });
});

module.exports = { getAll, getOne, create, update, remove, getUpcommingOrders };