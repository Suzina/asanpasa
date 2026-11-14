const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const RawMaterialController = require("../controllers/RawMaterialController");


router.use(validateToken);
router.get("/", RawMaterialController.getAll);
router.post("/", RawMaterialController.create);
router.get("/:id", RawMaterialController.getOne);
router.put("/:id", RawMaterialController.update);
router.delete("/:id", RawMaterialController.remove);
module.exports = router;