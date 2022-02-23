const mongoose = require("mongoose");

const familySchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  firstName: String,
  lastName: String,
  phone: {
    type: String,
  },
  relation: String,
});

const Family = new mongoose.model("familie", familySchema);

module.exports = Family;
