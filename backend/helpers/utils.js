const crypto = require("crypto");
const cloudinary=require("cloudinary")
import 'dotenv/config';
const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");

// Arrow function to generate a random number between min (inclusive) and max (exclusive)
const generateRandomNumber = () => {
    return crypto.randomInt(0, 10000);
}

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


const mailerSend = new MailerSend({
  apiKey: process.env.API_KEY,
});

const sentFrom = new Sender("trial-3zxk54vn7rpljy6v.mlsender.net", "Sneakerhouse");

async function sendEmail(recipientEmail, emailSubject, emailHtml, emailText) {
    const recipients = [new Recipient(recipientEmail)];

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject(emailSubject)
        .setHtml(emailHtml)
        .setText(emailText);

    try {
        await mailerSend.email.send(emailParams);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}




// Export the function
module.exports = {generateRandomNumber,uploadImageAndUpdateURL,sendEmail};
