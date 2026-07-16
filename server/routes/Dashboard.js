const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", validateToken,async (req, res) => {
  res.send("Welcome to dashboard");
});


module.exports = router;