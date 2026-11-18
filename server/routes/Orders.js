const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const OrderController = require("../controllers/OrderController");


router.use(validateToken);
router.get("/search", OrderController.search);
router.get("/upcomming-orders", OrderController.getUpcommingOrders);
router.get("/all-upcomming-orders", OrderController.getUpcommingOrdersList);
router.get("/get-total-orders", OrderController.getOrders);
router.get("/get-total-sales", OrderController.getTotalSales);

router.get("/", OrderController.getAll);
router.post("/", OrderController.create);
router.get("/:id", OrderController.getOne);

router.put("/:id", OrderController.update);
router.put("/amt-due/:id", OrderController.updateAmtDue);

router.delete("/:id", OrderController.remove);


module.exports = router;