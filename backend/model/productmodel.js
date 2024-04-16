const mongoose = require("mongoose");
const { Schema } = mongoose;

const variantSchema = new Schema({
  size: Number,
  price: Number,
  quantity: Number,
});

const productSchema = new Schema({
  name: String,
  category: String,
  image: String,
  color: String,
  variants: [variantSchema],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
