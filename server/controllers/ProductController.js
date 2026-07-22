const { Products } = require("../models");

const getAll = async (req, res) => {
  try {
    const categories = await Products.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

module.exports = { getAll};