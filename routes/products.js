const express = require("express");
const mongoose = require("mongoose");
const { Category } = require("../models/category");
const { Product } = require("../models/product");

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await Product.find();
    res.status(200).send(products);
});

router.post("/register", async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(404).send("No Category");
  
    const product = new Product({
      name: req.body.name,
      size: req.body.size,
      color: req.body.color,
      brand: req.body.brand,
      price: req.body.price,
      category,
      description: req.body.description,
      compositions: req.body.compositions,
      artNo: req.body.artNo,
      owner: req.body.owner,
    });
  
    await product.save();
    res.status(200).json({
      message: "Product successfully saved",
      product,
    });
});

module.exports = router;