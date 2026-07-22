const { Products } = require("../models");
const asyncHandler = require("../middlewares/asyncHandler");

const getAll = asyncHandler(async (req, res) => {
    const products = await Products.findByPk(req.params.id);
    if (!products) {
        const err = new Error("Products not found");
        err.status = 404;
        throw err;
    }
    res.json(products);
});

module.exports = { getAll};