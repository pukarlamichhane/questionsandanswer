const crypto = require("crypto");
const cloudinary = require("cloudinary");
require("dotenv").config();
const { MailerSend } = require("mailersend");
const { EmailParams, Recipient } = require("mailersend");

// Arrow function to generate a random number between min (inclusive) and max (exclusive)
const generateRandomNumber = () => {
  return crypto.randomInt(0, 10000);
};

const uploadImageAndUpdateURL = async (image) => {
  try {
    // Upload image to Cloudinary
    const uploadedResponse = await cloudinary.uploader.upload(image);

    // Update image URL
    return uploadedResponse.secure_url;
  } catch (error) {
    // Handle any errors that occur during upload
    console.error("Error uploading image:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

const mailersend = new MailerSend({
  api_key: process.env.API_KEY,
});

function sendEmail(recipientEmail, code) {
  const recipient = new Recipient(recipientEmail, "Recipient");
  const recipients = [recipient];

  const emailParams = new EmailParams()
    .setFrom("trial-3zxk54vn7rpljy6v.mlsender.net")
    .setFromName("Sneakers Store")
    .setRecipients(recipients)
    .setSubject("Verification code")
    .setText(`The verification code is ${code}`);

  mailersend.send(emailParams);
}

module.exports = { generateRandomNumber, uploadImageAndUpdateURL, sendEmail };
