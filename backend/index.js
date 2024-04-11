const express = require("express");
const cloudinary = require("cloudinary");
const connectDB = require("./db/connectDB");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const useroutes = require("./routes/userRoutes");
const productroutes = require("./routes/productRoutes");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cookieParser()); // Allow all origins
app.use(cors());
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/user", useroutes);
app.use("/api/product", productroutes);

app.listen(PORT, () => {
  console.log(`Server is listening at port :${PORT}`);
});
