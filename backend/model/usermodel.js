const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", required: true }, // Default role is 'user'
  isVerified: { type: Boolean, default: false }, // Default isVerified is false
});

const User = mongoose.model("User", userSchema);

module.exports = User;
