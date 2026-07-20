const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Products } = require("../models");


router.get("/", validateToken,async (req, res) => 
    {
        const products = await Products.findAll();
        res.json(products);
    });


module.exports = router;