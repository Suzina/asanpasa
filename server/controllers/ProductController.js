const { Products } = require("../models");
const { Categories } = require("../models");
const slugify = require("slugify");

const asyncHandler = require("../middlewares/asyncHandler");

const getAll = asyncHandler(async (req, res) => 
{
    const products = await Products.findAll({
        order: [['createdAt', 'DESC']],
        include: {
            model: Categories,
            as: "category",       // must match the alias in Products.belongsTo
            attributes: ["id", "name"]  // only pull what you need
            },
        });
    if (!products) 
    {
        const err = new Error("Products not found");
        err.status = 404;
        throw err;
    }
    res.json(products);
});

const getOne = asyncHandler(async (req, res) => 
{
    const id = req.params.id;
    const product = await Products.findByPk(id);
    if (!product) 
    {
        const err = new Error("Product not found");
        err.status = 404;
        throw err;
    }
    res.json(product);
});

const create = asyncHandler(async (req, res) => 
{
    const { name,price,category_id } = req.body;
    let image;
    if (!name || !name.trim() || !price || !category_id) 
    {
        const err = new Error("Field is required");
        err.status = 400;
        throw err;
    }

    if (req.file) 
    {
        image=req.file.filename;
    }
    else
    {
        image="";
    }
    const slug = slugify(name, { lower: true, strict: true });
    const product = await Products.create({
        name: name.trim(),
        image: image,
        price,
        category_id,
        slug: slug,
    });
    const productWithCategory = await Products.findByPk(product.id, {
    include: {
        model: Categories,
        as: "category",       // must match the alias in Products.belongsTo
        attributes: ["id", "name"],
    },
});
    res.status(201).json(productWithCategory); 
});

const update = asyncHandler(async (req, res) => 
{
    const id = req.params.id;
    const { name,price,category_id,image } = req.body;

    if (!name || !name.trim() || !price || !category_id) 
    {
        const err = new Error("Field is required");
        err.status = 400;
        throw err;
    }
    if (req.file) {
    product.image = req.file.filename; 
  }
    const slug = slugify(name, { lower: true, strict: true });
    const product = await Products.findByPk(id);

    if (!product) 
    {
        const err = new Error("Product not found");
        err.status = 400;
        throw err;
    }

    product.name = name;
    product.price = price;
    product.category_id = category_id;
   // product.image = image;
    product.slug = slug;

    await product.save();

    res.json(product); 
});

const remove = asyncHandler(async (req, res) => 
{
    const id = req.params.id;
    const product = await Products.findByPk(id);
    if (!product) 
    {
        const err = new Error("Product not found");
        err.status = 400;
        throw err;
    }

    await product.destroy();
    res.json({ message: "Product deleted successfully" });
});

module.exports = { getAll, getOne, create, update, remove };