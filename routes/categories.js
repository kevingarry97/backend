const express = require('express');
const { Category } = require('../models/category')
const router = express.Router();

router.get("", async (req, res) => {
    const category = await Category.find();
    res.send(category);
})

module.exports = router;