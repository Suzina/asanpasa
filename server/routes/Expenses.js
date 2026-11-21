const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const ExpensesController = require("../controllers/ExpensesController");


router.use(validateToken);
router.get("/", ExpensesController.getAll);
router.post("/", ExpensesController.create);
router.get("/:id", ExpensesController.getOne);
router.put("/:id", ExpensesController.update);
router.delete("/:id", ExpensesController.remove);
module.exports = router;