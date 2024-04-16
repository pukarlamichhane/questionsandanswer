const User = require("../model/usermodel");
const Verfied = require("../model/verfied");
const { generateRandomNumber, sendEmail } = require("../helpers/utils");

// Function to handle checking email
const checkEmail = async (req, res) => {
  const { email } = console.log(req.body);

  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });

    // If no matching email found
    if (!user) {
      return res.status(400).json({ error: "Invalid Email" });
    }

    const code = await generateRandomNumber();
    await Verfied.create({ email, code });
    await sendEmail(email, code);
    // If email exists, set it in cookies
    res.cookie("email", email, { maxAge: 900000, httpOnly: true });
    res.status(200).json({ message: "Email Validated and Stored in Cookies" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to handle checking code
const checkCode = async (req, res) => {
  const { code } = req.body;
  const userEmail = req.cookies.email;

  if (!userEmail) {
    return res.status(400).json({ error: "Email not found in cookies" });
  }

  try {
    // Check if the user with the provided email exists in the database
    const user = await Verfied.findOne({ email: userEmail });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check if the provided code matches some logic in your application
    if (code === user.code) {
      return res.status(200).json({ message: "Code is correct" });
    } else {
      return res.status(400).json({ error: "Incorrect code" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const changepassword = async (req, res) => {
  const userEmail = req.cookies.email;
  const { password, confrompassword } = req.body;

  if (password != confrompassword) {
    return res.status(400).json({ error: "password no match" });
  } else {
    const hash = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ email, hash });
    res.status(200).json("Password update sucessfully");
  }
};

// Export the functions
module.exports = {
  checkEmail,
  checkCode,
  changepassword,
};
