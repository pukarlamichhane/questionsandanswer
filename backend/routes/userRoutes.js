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

<<<<<<< HEAD
const {
  checkEmail,
  changepassword,
  verifyEmail,
  emailResend,
} = require("../controller/password");

=======
>>>>>>> 1d0a1b255a10e6b28ef1fb6e5580958ac2230536
const { checkRole } = require("../middleware/middleware");

const multer = require("multer");
const {
  checkEmail,
  changepassword,
  verifyEmail,
} = require("../controller/password");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });
// User routes
router.post("/login", login);
router.get("/signup", signupUser);
router.post("/adduser", addUser);
router.put("/users/:username", updateUser); // Update user by username
router.delete("/users/:username", deleteUser); // Delete user by username
router.get("/users", getAlluser); // Get all users

// Product routes
router.get("/products/:id", getProductById); // Get Product by ID
router.put("/products/:id", upload.single("itemImage"), updateProductById); // Update Product by ID
router.delete("/products/:id", deleteProductById); // Delete Product by ID
router.post("/addproduct", upload.single("itemImage"), addProduct); // Add Product
router.get("/products", getAllProducts); // Get all Products

// Password routes
router.post("/checkCode", verifyEmail);
router.post("/checkEmail", checkEmail);
router.post("/changepassword", changepassword);
<<<<<<< HEAD
router.post("/resendcode", emailResend);

=======
>>>>>>> 1d0a1b255a10e6b28ef1fb6e5580958ac2230536
module.exports = router;
