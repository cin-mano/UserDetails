const express = require("express");
// const Joi = require("joi");
const helmet = require("helmet");
require("./db/conn");
// const User = require("./models/user");
// const Family = require("./models/family");
// const schema = require("./validators/uservalidator");
const router = require("./routers/index");


const app = express();
app.use(helmet());

app.use(express.json());

//using router middlewares
app.use("/", router);

app.listen(8000, () => {
  console.log("connection success at port 8000");
});
