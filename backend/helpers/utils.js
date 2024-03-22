const crypto = require("crypto");
const cloudinary=require("cloudinary")
const sgMail = require('@sendgrid/mail');

// Arrow function to generate a random number between min (inclusive) and max (exclusive)
const generateRandomNumber = () => {
    return crypto.randomInt(0, 1000000);
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

sgMail.setApiKey(process.env.SendGrid_API);

const sendEmail = (recipient, sender, subject, text) => {
    const msg = {
      to: recipient,
      from: sender,
      subject: subject,
      text: text,
    };
  
    sgMail.send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
};


// Export the function
module.exports = {generateRandomNumber,uploadImageAndUpdateURL,sendEmail};
