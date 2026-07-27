const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const OrderController = require("../controllers/OrderController");


router.use(validateToken);
router.get("/", OrderController.getAll);
router.post("/", OrderController.create);
router.get("/:id", OrderController.getOne);
router.put("/:id", OrderController.update);
router.delete("/:id", OrderController.remove);

module.exports = router;