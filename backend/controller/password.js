const User = require("../model/usermodel");
const Verfied = require("../model/verfied");
const { generateRandomNumber, sendEmail } = require("../helpers/utils");

const checkEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Email not found" });
    }
    const code = await generateRandomNumber();
    console.log(code);
    await Verfied.create({ email, code }); // Corrected typo here
    await sendEmail(email, code);
    // If email exists, set it in cookies

    res.status(200).json({ message: "Email Validated", email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const changepassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body; // Corrected variable name

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  try {
    // Securely hash the new password
    const hash = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { password: hash } },
      { new: true } // Return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error during password update:", error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error." });
  }
};

// Export the functions
const verifyEmail = async (req, res) => {
  const { email, code } = req.body;

  try {
    // Check for required fields in the request body
    if (!email || !code) {
      return res.status(400).json({ message: "Email and code are required." });
    }

    // Fetch the verification record by email
    const verification = await Verfied.findOne({ email });

    if (!verification) {
      return res
        .status(404)
        .json({ message: "No verification record found for this email." });
    }

    // Calculate the time difference in minutes
    const currentTime = new Date();
    const updatedAt = new Date(verification.updatedAt);
    const timeDifference = currentTime - updatedAt;
    const timeDifferenceInMinutes = timeDifference / (1000 * 60);

    if (timeDifferenceInMinutes > 2) {
      return res.status(400).json({
        message: "Verification code expired. Please request a new one.",
      });
    }

    if (verification.code !== code) {
      return res.status(400).json({ message: "Incorrect verification code." });
    }

    // Verification successful, now update the user status to isVerified
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { isVerified: true, updatedAt: currentTime } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "Email verified successfully and user is now verified.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error during email verification:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  checkEmail,
  changepassword,
  verifyEmail,
};
