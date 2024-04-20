const Product = require("../model/productmodel");
const cloudinary = require("cloudinary").v2;
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

const addProduct = async (req, res) => {
  try {
    const base64String = req.file.buffer.toString("base64");

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${base64String}`,
      {
        folder: "photo", // Optional: Folder to store images in Cloudinary
      }
    );
    // Create a new Product object
    const product = new Product({
      itemName: req.body.itemName,
      images: result.secure_url, // Assuming images is an array
      itemColor: req.body.itemColor,
      itemCategory: req.body.itemCategory,
      variants: req.body.variants,
    });

    // Save the product to the database
    await product.save();

    res.json({ message: "Product added successfully" });
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
