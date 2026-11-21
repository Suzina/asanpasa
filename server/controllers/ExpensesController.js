const { Expenses } = require("../models");
const { RawMaterials } = require("../models");
const { Vendors } = require("../models");

const asyncHandler = require("../middlewares/asyncHandler");


const getAll = asyncHandler(async (req, res) => 
{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Expenses.findAndCountAll({
        order: [['createdAt', 'DESC']],
        limit,
        offset,
        include: [
        {
            model: RawMaterials,
            as: "rawMaterial",      
            attributes: ["name"],
        },
        {
            model: Vendors,
            as: "vendor",      
            attributes: ["name"],
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

const getOne = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const expenses = await Expenses.findByPk(id);
  if (!expenses) 
  {
    const err = new Error("Expense not found");
    err.status = 404;
    throw err;
  }
  res.json(expenses);
 
});
const create = asyncHandler(async (req, res)=> 
{
  
  const { vendor_id,raw_material_id,qty,amount,payment_status,payment_date } = req.body;
  const toNullIfEmpty = (val) => (val === "" || val === undefined ? null : val);

  if (!vendor_id || !raw_material_id || !qty || !amount) 
  {
    const err = new Error("Required fields are missing");
    err.status = 400;
    throw err;
  }

  const expense = await Expenses.create({
        vendor_id,
        raw_material_id,
        qty,
        amount,
        payment_status,
        payment_date
    });
  
    const expensesWithVendorRaw = await Expenses.findByPk(expense.id, {
      include: [
          {
              model: RawMaterials,
              as: "rawMaterial",      
              attributes: ["name"],
          },
          {
              model: Vendors,
              as: "vendor",      
              attributes: ["name"],
          },
        ],
  });
  res.status(201).json(expensesWithVendorRaw); 
  
});

const update = asyncHandler(async (req, res) => 
{
  const id = req.params.id;
  const { vendor_id,raw_material_id,qty,amount,payment_status,payment_date } = req.body;


  if (!vendor_id || !raw_material_id || !qty || !amount) 
  {
    const err = new Error("Required fields are missing");
    err.status = 400;
    throw err;
  }

  const expenses = await Expenses.findByPk(id);

  if (!expenses) 
  {
    const err = new Error("Expense not found");
    err.status = 400;
    throw err;
  }

  expenses.vendor_id = vendor_id;
  expenses.raw_material_id = raw_material_id;
  expenses.qty = qty;
  expenses.amount = amount;
  expenses.payment_status = payment_status;
  expenses.payment_date = payment_date;
  await expenses.save();

  res.json(expenses); // return the updated object
  
});

const remove = asyncHandler(async (req, res) => 
{
  const id = req.params.id;
  const expenses = await Expenses.findByPk(id);
  if (!expenses) 
  {
    const err = new Error("Expense not found");
    err.status = 400;
    throw err;
  }

  await expenses.destroy();
  res.json({ message: "Expense deleted successfully" });
} 
);

module.exports = { getAll, getOne, create, update, remove };