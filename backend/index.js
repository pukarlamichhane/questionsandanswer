const express = require('express'); 
const connectDB = require('./db/connectDB');
require('dotenv').config();

const app = express(); 
const PORT = process.env.PORT ||8000; 


connectDB()
app.get('/', (req, res) => { 
  res.send('Hello World!'); 
}); 

app.listen(PORT, () => { 
  console.log(`Server is listening at port :${PORT}`); 
}); 
