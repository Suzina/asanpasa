const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const ProductController = require("../controllers/ProductController");

router.use(validateToken);

router.get("/", ProductController.getAll);

   

    /*router.post("/",validateToken, async (req, res) => {
        const { name,image,price,category} = req.body;
        Products.create({
          name: name,
          image: image,
          price:price,
          category:category,
        });
        res.json("SUCCESS");
    });
*/

module.exports = router;