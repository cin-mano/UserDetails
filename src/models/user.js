const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const res = require("express/lib/response");
// const validator=require("validator");

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    unique: true,
  },
  countryCode: {
    type: String,
  },
  pin: {
    type: String,
  }
});
// userSchema.set('timestamps',true);

const User = new mongoose.model("user", userSchema);

module.exports = User;