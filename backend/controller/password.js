const User = require("../model/usermodel");
const Verified = require("../model/verfied");
const bcrypt = require("bcrypt");
const { generateRandomNumber, sendEmail } = require("../helpers/utils");

const checkEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }

    const code = generateRandomNumber();
    await Verified.create({ email, code }); // Corrected typo in 'Verified'

    await sendEmail(email, code);

    res.status(200).json({ message: "Verification code sent to email." });
  } catch (error) {
    console.error("Error in checkEmail:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const changepassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

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
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error in changepassword:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const verifyEmail = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: "Email and code are required." });
  }

  try {
    const verification = await Verified.findOne({ email });

    if (!verification) {
      return res
        .status(404)
        .json({ error: "No verification record found for this email." });
    }

    const currentTime = new Date();
    const updatedAt = new Date(verification.updatedAt);
    const timeDifferenceInMinutes = (currentTime - updatedAt) / (1000 * 60);

    if (timeDifferenceInMinutes > 2) {
      return res.status(400).json({
        error: "Verification code expired. Please request a new one.",
      });
    }

    if (verification.code !== code) {
      return res.status(400).json({ error: "Incorrect verification code." });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { isVerified: true } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    console.error("Error in verifyEmail:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const emailResend = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    const verification = await Verified.findOne({ email });

    if (!verification) {
      return res
        .status(404)
        .json({ error: "No verification record found for this email." });
    }

    const currentTime = new Date();
    const updatedAt = new Date(verification.updatedAt);
    const timeDifferenceInMinutes = (currentTime - updatedAt) / (1000 * 60);

    if (timeDifferenceInMinutes > 2) {
      const newVerificationCode = generateRandomNumber();
      verification.code = newVerificationCode;
      verification.updatedAt = currentTime;
      await verification.save();

      await sendEmail(email, newVerificationCode);

      return res
        .status(200)
        .json({ message: "New verification code sent to email." });
    }

    return res.status(400).json({
      error:
        "Current verification code is still valid. Please wait before requesting a new one.",
    });
  } catch (error) {
    console.error("Error in emailResend:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

module.exports = {
  checkEmail,
  changepassword,
  verifyEmail,
  emailResend,
};
