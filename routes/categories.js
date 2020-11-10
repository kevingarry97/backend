const express = require("express");
const mongoose = require("mongoose");
const { Category } = require('../models/category');

const router = express.Router();

router.get("/", async (req, res) => {
    const category = await Category.find();
    res.status(200).send(category)
});

module.exports = router;