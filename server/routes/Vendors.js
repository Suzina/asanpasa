const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const VendorsController = require("../controllers/VendorsController");


router.use(validateToken);
router.get("/", VendorsController.getAll);
router.post("/", VendorsController.create);
router.get("/:id", VendorsController.getOne);
router.put("/:id", VendorsController.update);
router.delete("/:id", VendorsController.remove);
module.exports = router;