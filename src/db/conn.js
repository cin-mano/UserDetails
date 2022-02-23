const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/registeredapi")
  .then(() => {
    console.log("mongo connected");
  })
  .catch((e) => {
    console.log("Connection failed");
  });
