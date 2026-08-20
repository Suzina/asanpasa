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
    const { items,fullname,address,phonenumber,total_amt,advance,shipping_cost,delivery_date,status } = req.body;
    const user_id = req.user.id; 

    const order = await Orders.findByPk(id);

    if (!order) 
    {
        const err = new Error("Order not found");
        err.status = 400;
        throw err;
    }
    
    order.user_id = user_id;
    if (fullname !== undefined) order.fullname = fullname;
    if (address !== undefined) order.address = address;
    if (phonenumber !== undefined) order.phonenumber = phonenumber;
    if (advance !== undefined) order.advance = advance;
    if (status !== undefined) order.status = status;
    if (shipping_cost !== undefined) order.shipping_cost = shipping_cost;
    if (delivery_date !== undefined) order.delivery_date = delivery_date;
    if (total_amt !== undefined && advance !== undefined)
    {
        let amt_due=total_amt-advance;
        order.amt_due = amt_due;

    }
    if (total_amt !== undefined)
    {
        let computedTotal = total_amt;
        if (Array.isArray(items)) 
        {
            computedTotal = items.reduce((sum, item) => {
                const qty = parseFloat(item.qty) || 0;
                const price = parseFloat(item.price) || 0;
                return sum + qty * price;
            }, 0);
        }
        order.total_amt = computedTotal;
    }
  

    await order.save();
    if (Array.isArray(items)) 
        {
            await OrderItem.destroy({ where: { order_id: id }});

            const rows = items
                .filter(item => item.product_id) // drop empty rows
                .map(item => ({
                    order_id: id,
                    product_id: item.product_id,
                    quantity: parseFloat(item.qty) || 0,
                    price: parseFloat(item.price) || 0,
                    user_id : user_id,
                }));

            if (rows.length > 0) 
            {
                await OrderItem.bulkCreate(rows);
            }
        }

    res.send("Update Successful"); 
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
    tomorrow.setDate(today.getDate() + 5);

    const todayStr = today.toISOString().split('T')[0];       // "2026-08-07"
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    /*const orders = await Orders.findAll({
        where: {
            delivery_date: {
                [Op.in]: [todayStr, tomorrowStr]
            },
            status: 'Pending'
        },
        attributes: ["id", "fullname", "total_amt", "delivery_date","status"],
        order: [['delivery_date', 'ASC']],
        include: [
        {
            model: Users,
            as: "user",       
            attributes: ["username"],
            required: true,  
        },
            {
            model: OrderItem,
            as: "orderItems",  
            attributes: ["id"],        // must match alias in Orders.hasMany(OrderItems, { as: "items" })
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
    });*/
    
    const order = await Orders.findAll({
        where: {
            status: 'Pending'
        },
        attributes: ["id", "fullname", "total_amt", "delivery_date","status","phonenumber","address"],
        order: [['delivery_date', 'ASC']],
        include: [
        {
            model: Users,
            as: "user",       
            attributes: ["username"],
            required: true,  
        },
            {
            model: OrderItem,
            as: "orderItems",  
            attributes: ["id","quantity","price"],        // must match alias in Orders.hasMany(OrderItems, { as: "items" })
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
        return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
});

const getTotalOrders = asyncHandler(async (req, res) => 
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
const search = asyncHandler(async (req, res) => 
{
    const { fullname, phonenumber, address, status } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const filter = {};

    if (fullname) filter.fullname = { [Op.like]: `%${fullname}%` };
    if (phonenumber) filter.phonenumber = { [Op.like]: `%${phonenumber}%` };
    if (address) filter.address = { [Op.like]: `%${address}%` };
    if (status) filter.status = status;

    const { count, rows } = await Orders.findAndCountAll({
        where: filter,
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
    });});
module.exports = { getAll, getOne, create, update, remove, getUpcommingOrders, search };