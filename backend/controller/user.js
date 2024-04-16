const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create a JWT token with user information and role
    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET);

    // Send token in response
    return res.json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addUser = async (req, res) => {
  const { email, password, usertype } = req.body;

  // Validate input
  if (!email || !password || !usertype) {
    return res
      .status(400)
      .json({ message: "Email, password, and usertype are required" });
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    // Create new user in the database
    await User.create({ email, password: hash, role: usertype });
    return res.json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params; // Assuming the id is used for identifying the user to update
  const updatedUser = req.body;

  try {
    // Update user in the database
    await User.findByIdAndUpdate(id, updatedUser);
    return res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const hash = await bcrypt.hash(password, 10);
  try {
    // Check if username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Add the new user to the database
    await User.create({ email, password: hash });

    return res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete user from the database
    await User.findByIdAndDelete(id);
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAlluser = async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAlluser,
  login,
  addUser,
  updateUser,
  signupUser,
  deleteUser,
};
