const { default: mongoose } = require("mongoose")
require('dotenv').config();


const connectDB= () => {
  try {
    const conn =mongoose.connect(process.env.MONGO_URI)
    console.log("Connected")
  } catch (error) {
    console.log(error)
  }
}

module.exports=connectDB;