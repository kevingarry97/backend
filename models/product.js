const mongoose = require("mongoose");
const { categorySchema } = require('./category');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: [String],
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: categorySchema,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    compositions:{
        type: [String],
        required: true,
    },
    artNo:{
        type: Number,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
})

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
exports.productSchema = productSchema;