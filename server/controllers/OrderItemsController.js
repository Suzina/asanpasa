const { OrderItem } = require("../models");
const asyncHandler = require("../middlewares/asyncHandler");



const remove = asyncHandler(async (req, res) => 
{
  const id = req.params.id;
  const orderItem = await OrderItem.findByPk(id);
  if (!orderItem) 
  {
    const err = new Error("Order item not found");
    err.status = 400;
    throw err;
  }

  await orderItem.destroy();
  res.json({ message: "Order item deleted successfully" });
} 
);

module.exports = { remove };