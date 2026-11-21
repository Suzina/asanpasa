const { OrderItem, Orders } = require("../models");
const asyncHandler = require("../middlewares/asyncHandler");

const remove = asyncHandler(async (req, res) => 
{
  const transaction = await OrderItem.sequelize.transaction();
  try 
  {
    const id = req.params.id;
    const orderItem = await OrderItem.findByPk(id, {
        transaction
    });
   
    if (!orderItem) 
    {
      const err = new Error("Order item not found");
      err.status = 400;
      throw err;
    }
    const orderId = orderItem.order_id;

    const order = await Orders.findByPk(orderId, {
      transaction,
      lock: transaction.LOCK.UPDATE
    });

    if (!order) 
    {
      const err = new Error("Order not found");
      err.status = 404;
      throw err;
    }

    if (["delivered", "cancelled"].includes(String(order.status).toLowerCase())) 
    {
      const err = new Error(`Cannot modify a ${order.status} order`);
      err.status = 409;
      throw err;
    }

     const itemCount = await OrderItem.count({
      where: { order_id: order.id },
      transaction
    });
    if (itemCount <= 1) 
    {
      const err = new Error("Cannot delete the last item of an order");
      err.status = 422;
      throw err;
    }
    
    const amtDue = Number(order.amt_due);

    if (amtDue === 0 || amtDue < 0) 
    {
      const err = new Error("Item already Paid Cannot be deleted");
      err.status = 422;
      throw err;
    }
    await orderItem.destroy({ transaction });

    const row = await OrderItem.findOne({
      attributes: [[OrderItem.sequelize.literal("COALESCE(SUM(price * quantity), 0)"), "subtotal"]],
      where: { order_id: order.id },
      transaction,
      raw: true
    });

    
    const totalAmt = Number(row.subtotal) + Number(order.shipping_cost);
    const amtPaid = Number(order.advance);
    const newAmtDue = Math.max(0, totalAmt - amtPaid);

    const totals = {
      sub_total: Number(row.subtotal),
      total_amt: totalAmt,
      amt_due: newAmtDue
    };

    await order.update(totals, { transaction });
    await transaction.commit();

    res.json({ message: "Order item deleted successfully", totals });
  } 
  catch (err) {
    await transaction.rollback();
    throw err;
  }
});

module.exports = { remove };