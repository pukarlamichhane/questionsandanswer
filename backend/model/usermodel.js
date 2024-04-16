const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", required: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }, // Default createdAt time is the current time
  updatedAt: { type: Date, default: Date.now }, // Default updatedAt time is also set to the current time
});

const User = mongoose.model("User", userSchema);

module.exports = User;
