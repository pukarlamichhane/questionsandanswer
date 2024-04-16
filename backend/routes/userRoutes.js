const express = require("express");
const {
  login,
  addUser,
  updateUser,
  deleteUser,
  signupUser,
} = require("../controller/user");
const { checkRole } = require("../middleware/middleware");

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

const router = express.Router();

router.post("/login", login);
router.post("/adduser", addUser);
router.put("/update-user/:username", updateUser);
router.post("/signup", signupUser);
router.delete("/delete-user/:username", deleteUser);
router.get("/:id", getProductById); // Get Product by ID
router.put("/:id", updateProductById); // Update Product by ID
router.delete("/:id", deleteProductById); // Delete Product by ID
router.post("/add", addProduct); // Add Product
router.get("/products", getAllProducts);
router.post("/checkemail", checkEmail);
router.post("/checkcode", checkCode);
router.post("/changepassword", changepassword);

module.exports = router;
