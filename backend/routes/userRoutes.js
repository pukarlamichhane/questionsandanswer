const express = require("express");
const {
  login,
  addUser,
  updateUser,
  deleteUser,
  signupUser,
  getAlluser,
} = require("../controller/user");
const {
  getProductById,
  updateProductById,
  deleteProductById,
  addProduct,
  getAllProducts,
} = require("../controller/product");
const {
  checkEmail,
  checkCode,
  changepassword,
} = require("../controller/password");
const { checkRole } = require("../middleware/middleware");

const router = express.Router();

// User routes
router.post("/login", login);
router.post("/signup", signupUser);
router.post("/adduser", addUser);
router.put("/users/:username", updateUser); // Update user by username
router.delete("/users/:username", deleteUser); // Delete user by username
router.get("/users", getAlluser); // Get all users

// Product routes
router.get("/products/:id", getProductById); // Get Product by ID
router.put("/products/:id", updateProductById); // Update Product by ID
router.delete("/products/:id", deleteProductById); // Delete Product by ID
router.post("/addproduct", addProduct); // Add Product
router.get("/products", getAllProducts); // Get all Products

// Password routes
router.post("/checkemail", checkEmail);
router.post("/checkcode", checkCode);
router.post("/changepassword", changepassword);

module.exports = router;
