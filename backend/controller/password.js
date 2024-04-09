const User = require('./userModel');

app.post('/check-email', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the email exists in the database
        const user = await User.findOne({ email });

        // If no matching email found
        if (!user) {
            return res.status(400).json({ error: 'Invalid Email' });
        }

        // If email exists, set it in cookies
        res.cookie('email', email, { maxAge: 900000, httpOnly: true });
        res.status(200).json({ message: 'Email Validated and Stored in Cookies' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});