const User = require("./userModel");
const { generateRandomNumber } = require("../helpers/utils");

app.post("/check-email", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });

    // If no matching email found
    if (!user) {
      return res.status(400).json({ error: "Invalid Email" });
    }

    code = await generateRandomNumber();
    sendEmail();

    // If email exists, set it in cookies
    res.cookie("email", email, { maxAge: 900000, httpOnly: true });
    res.status(200).json({ message: "Email Validated and Stored in Cookies" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/check-code", async (req, res) => {
  const { code } = req.body;
  const userEmail = req.cookies.email;

  if (!userEmail) {
    return res.status(400).json({ error: "Email not found in cookies" });
  }

  try {
    // Check if the user with the provided email exists in the database
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check if the provided code matches some logic in your application
    if (code === "your-validation-code") {
      return res.status(200).json({ message: "Code is correct" });
    } else {
      return res.status(400).json({ error: "Incorrect code" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
