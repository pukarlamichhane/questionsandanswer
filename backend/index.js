const express = require('express');
const connectDB = require('./db/connectDB');
require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const useroutes  = require('./routes/userRoutes');
const productroutes  = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cookieParser()); // Use cookie-parser middleware

connectDB();

// Correct the path prefix for user routes
app.use("/api/user", useroutes);
app.use("/api/product",productroutes);

app.listen(PORT, () => {
  console.log(`Server is listening at port :${PORT}`);
});
