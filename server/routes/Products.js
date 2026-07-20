const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Products } = require("../models");


    router.get("/", validateToken,async (req, res) => 
    {
        const products = await Products.findAll();
        res.json(products);
    });

    router.post("/",validateToken, async (req, res) => {
        const { name,image,price,category} = req.body;
        Products.create({
          name: name,
          image: image,
          price:price,
          category:category,
        });
        res.json("SUCCESS");
    });


module.exports = router;