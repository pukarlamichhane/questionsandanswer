const crypto = require("crypto");
const cloudinary = require("cloudinary");
require("dotenv").config();
const { MailerSend, EmailParams, Recipient } = require("mailersend");

// Arrow function to generate a random number between min (inclusive) and max (exclusive)
const generateRandomNumber = () => {
  return crypto.randomInt(0, 10000);
};

const mailersend = new MailerSend({
  api_key: process.env.API_KEY,
});

async function sendEmail(recipientEmail, code) {
  try {
    const recipient = new Recipient(recipientEmail, "Recipient");
    const recipients = [recipient];

    const emailParams = new EmailParams()
      .setFrom("trial-3zxk54vn7rpljy6v.mlsender.net")
      .setRecipients(recipients)
      .setSubject("Verification code")
      .setText(`The verification code is ${code}`);

    await mailersend.send(emailParams);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { generateRandomNumber, sendEmail };
