const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

const Category = mongoose.model("Category", categorySchema);

exports.Category = Category;
exports.categorySchema = categorySchema;