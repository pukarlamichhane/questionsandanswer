const express = require("express");
const {
  login,
  addUser,
  updateUser,
  deleteUser,
  signupUser,
} = require("../controller/user");
const { checkRole } = require("../middleware/middleware");

const router = express.Router();

router.post("/login", login);
router.post("/adduser", addUser);
router.put("/update-user/:username", updateUser);
router.post("/signup", signupUser);
router.delete("/delete-user/:username", deleteUser);

module.exports = router;
