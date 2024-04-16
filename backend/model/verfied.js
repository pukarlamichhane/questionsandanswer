const mongoose = require("mongoose");

const Verfiedschema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }, // Default createdAt time is the current time
  updatedAt: { type: Date, default: Date.now }, // Default updatedAt time is also set to the current time
});

const Verfied = mongoose.model("Verfied", Verfiedschema);

module.exports = Verfied;
