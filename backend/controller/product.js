const Product = require("../model/productmodel");
const uploadImageAndUpdateURL = require("../helpers/utils");
// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product by ID
const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, color, image, category, variants } = req.body;
  images = uploadImageAndUpdateURL(image);
  try {
    const product = await Product.findByIdAndUpdate(id, {
      name,
      color,
      images,
      category,
      variants,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product by ID
const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add product
const addProduct = async (req, res) => {
  const { itemName, itemImage, itemColor, itemCategory, variants } = req.body;
  images = await uploadImageAndUpdateURL(itemImage);

  try {
    const product = new Product({
      itemName,
      images,
      itemColor,
      itemCategory,
      variants,
    });

    await product.save();
    res.json({ message: "Product added successfully", id: product._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  addProduct,
};
