const User = require("../model/usermodel");
const Verfied = require("../model/verfied");
const { generateRandomNumber, sendEmail } = require("../helpers/utils");

// // Function to handle checking email
// const checkEmail = async (req, res) => {
//   const { email } = req.body;
//   console.log(email);
//   try {
//     // Check if the email exists in the database
//     const user = await User.findOne({ email });

//     // If no matching email found
//     if (!user) {
//       return res.status(400).json({ error: "Email not found" });
//     }

//     const code = await generateRandomNumber();
//     console.log(code);
//     await Verfied.create({ email, code }); // Corrected typo here
//     // await sendEmail(email, code);
//     // If email exists, set it in cookies
//     res.cookie("email", email, { maxAge: 900000, httpOnly: true });
//     res.status(200).json({ message: "Email Validated and Stored in Cookies" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // Function to handle checking code
// const checkCode = async (req, res) => {
//   const { code } = req.body;
//   const userEmail = req.cookies.email;

//   if (!userEmail) {
//     return res.status(400).json({ error: "Email not found in cookies" });
//   }

//   try {
//     // Check if the user with the provided email exists in the database
//     const user = await Verfied.findOne({ email: userEmail });

//     if (!user) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     // Check if the provided code matches some logic in your application
//     if (code === user.code) {
//       return res.status(200).json({ message: "Code is correct" });
//     } else {
//       return res.status(400).json({ error: "Incorrect code" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const changepassword = async (req, res) => {
//   const userEmail = req.cookies.email;
//   const { password, confrompassword } = req.body;

//   if (password != confrompassword) {
//     return res.status(400).json({ error: "password no match" });
//   } else {
//     const hash = await bcrypt.hash(password, 10);
//     await User.findOneAndUpdate({ email, hash });
//     res.status(200).json("Password update sucessfully");
//   }
// };

// // Export the functions
// module.exports = {
//   checkEmail,
//   checkCode,
//   changepassword,
// };

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

module.exports = verifyEmail;
