const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const OrderItemsController = require("../controllers/OrderItemsController");


router.use(validateToken);

router.delete("/:id", OrderItemsController.remove);


module.exports = router;