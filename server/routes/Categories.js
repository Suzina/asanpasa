const express = require("express");
const router = express.Router();
const { Categories } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", validateToken,async (req, res) => {
   const categories = await Categories.findAll();
  res.json(categories);
});

router.post("/", validateToken,async (req, res) => {
  const { name } = req.body;
  Categories.create({
      name: name
    });
    res.json("Category added successful");
});
module.exports = router;