const express = require("express");
const router = express.Router();
const { Categories } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", validateToken,async (req, res) => {
   const categories = await Categories.findAll();
  res.json(categories);
});


module.exports = router;