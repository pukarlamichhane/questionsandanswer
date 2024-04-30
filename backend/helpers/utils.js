const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Arrow function to generate a random number between min (inclusive) and max (exclusive)
const generateRandomNumber = () => {
  return crypto.randomInt(0, 1000000);
};

// Create a transporter using nodemailer with Gmail and environment variables for authentication
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Use environment variable for email
    pass: process.env.PASSWORD, // Use environment variable for password or app-specific password
  },
});

// Asynchronous function to send email with a verification code
async function sendEmail(recipientEmail, code) {
  try {
    // Define mail options
    const mailOptions = {
      from: process.env.EMAIL, // Use the configured sender email address
      to: recipientEmail, // Recipient's email
      subject: "Verification Code", // Email subject
      text: `Your verification code is ${code}`, // Corrected template literal to include the code
      html: `<b>Your verification code is ${code}</b>`, // Corrected HTML content with proper bold tag
    };

    // Send the email and wait for completion
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: " + info.response); // Log successful email send
  } catch (error) {
    console.error("Error sending email:", error); // Log errors with detailed information
  }
}

module.exports = { sendEmail }; // Export the function for use in other modules

module.exports = { generateRandomNumber, sendEmail };
