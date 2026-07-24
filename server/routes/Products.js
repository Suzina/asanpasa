const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const ProductController = require("../controllers/ProductController");
const upload = require("../middlewares/upload");

router.use(validateToken);

router.get("/", ProductController.getAll);
router.post("/", upload.single("image"), ProductController.create);
router.get("/:id", ProductController.getOne);
router.put("/:id", upload.single("image"),ProductController.update);
router.delete("/:id", ProductController.remove);
   

module.exports = router;