const User = require("../models/user");
const jwt = require("jsonwebtoken");
const download=require("image-downloader");
const {
  createSchema,
  updateSchema,
  loginSchema,
} = require("../validators/uservalidator");

const registered = async (req, res, next) => {
  try {
    const data = new User(req.body);

    const { error, value } = createSchema.validate(req.body);
    if (error) {
      res.status(200).send({
        status: 200,
        message: "Validation error",
        data: error.details[0].message,
      });
      return;
    }

    const result = await data.save();
    // console.log(token);
    const token = jwt.sign(
      {
        id: result._id,
      },
      "jwt",
      {
        expiresIn: 123456789,
      }
    );

    res.status(201).send({
      status: 200,
      message: "Successfully created user",
      data: result,
      token: token,
    });
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "Bad request",
      data: e,
    });
    console.log(e);
  }
};

const updateRegistered = async (req, res, next) => {
  try {
    const { error, value } = updateSchema.validate(req.body);
    if (error) {
      return res.status(200).send({
        status: 200,
        message: "Validation error",
        data: error.details[0].message,
      });
    }
    const _id = req.userId;
    // console.log(_id);
    const checkCountry=await User.findOne({_id:_id});
    // console.log(checkCountry);
    if(!checkCountry){
      return res.status(200).send({
        status:200,
        message:"Invalid User",
        data:null
      })
    }if(checkCountry.countryCode!==req.body.oldCountryCode){
      return res.status(200).send({
        status:200,
        message:"Old country code is wrong",
        data:null
      })
    }
    const userData = await User.findByIdAndUpdate(_id,{phone:req.body.phone,countryCode:req.body.newCountryCode,pin:req.body.pin});
    if (!userData) {
      res.status(200).send({
        status: 200,
        message: "User not found",
        data: userData,
      });
      return;
    }
    return res.status(200).send({
      status: 200,
      message: "Successfully updated",
      data: userData,
    });
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "Bad request",
      data: error,
    });
  }
};

const selectRegistered = async (req, res, next) => {
  try {
    const _id = req.userId;

    // console.log(phone);
    // res.send(phone);
    const userData = await User.findOne({_id: _id });
    if (userData) {
      res.status(200).send({
        status: 200,
        message: "User Found",
        data: userData,
      });
    } else {
      res.status(200).send({
        status: 200,
        message: "User not found",
        data: userData,
      });
      return;
    }
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "Bad request",
      data: e,
    });
  }
};

const deleteRegistered = async (req, res, next) => {
  try {
    const _id = req.userId;
    const deleteUser = await User.findOneAndDelete({ _id: _id });
    if (!deleteUser) {
      res.status(200).send({
        status: 200,
        message: "User not found",
        data: deleteUser,
      });
      return;
    }
    res.status(200).send({
      status: 200,
      message: "Successfully deleted",
      data: deleteUser,
    });
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "Bad request",
      data: e,
    });
  }
};

const loginRegistered = async (req, res, next) => {
  try {
    const phone = req.body.phone;
    const countryCode = req.body.countryCode;
    const pin = req.body.pin;

    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      res.status(200).send({
        status: 200,
        message: "Validation error",
        data: error.details[0].message,
      });
      return;
    }
    const data = await User.findOne({ phone: phone });
    // const data=userData.pop();
    if (data) {
      if (data.countryCode != countryCode) {
        res.status(200).send({
          status: 200,
          message: "Country code is wrong",
          data: countryCode,
        });
        return;
      }
      if (data.pin != pin) {
        res.status(200).send({
          status: 200,
          message: "Pin is wrong",
          data: pin,
        });
        return;
      }
      const token = jwt.sign(
        {
          id: data._id,
        },
        "jwt",
        {
          expiresIn: 123456789,
        }
      );
      res.status(200).send({
        status: 200,
        message: "Successfully logged in",
        data: data,
        token: token,
      });
      return;
    }
    res.status(200).send({
      status: 200,
      message: "Invalid user login failed",
      data: data,
    });
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "Bad request",
      data: e,
    });
  }
};
const uploadImage=(req,res,next)=>{
  // console.log(req.file);
  
  res.status(200).send({
    status:200,
    message:"File uploaded",
    data:req.file
  })
}
const downloadImage=(req,res,next)=>{

  const options = {
    url: req.body.url,
    dest: 'uploads/'                // will be saved to /path/to/dest/image.jpg
  }
  
  download.image(options)
    .then(({ filename }) => {
      console.log('Saved to', filename)  // saved to /path/to/dest/image.jpg
    })
    .catch((err) => console.error(err))

    res.status(200).send({
      status:200,
      message:"downloaded succesfully"
    })
}

module.exports = {
  registered,
  updateRegistered,
  selectRegistered,
  deleteRegistered,
  loginRegistered,
  uploadImage,
  downloadImage
};
