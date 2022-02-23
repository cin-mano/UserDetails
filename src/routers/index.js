const express = require("express");
// const User = require("../models/user");
// const schema = require("../validators/uservalidator");
const userControl = require("../controllers/index");
const auth=require("../helper/auth");

// const Family = require("../models/family");
const familyControl = require("../controllers/family");

//defining router
const router = new express.Router();
//file upload multer
const multer=require("multer");
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/")
    },
    filename:function(req,file,cb){
        console.log(file);
        const newName=Date.now()+'-'+file.originalname;
        cb(null,newName);
    }
})
const upload=multer({storage:storage});

//register
router.post("/registered", userControl.registered);

//update

router.patch("/updateuser",auth.checkToken, userControl.updateRegistered);

// select

router.get("/selectuser",auth.checkToken, userControl.selectRegistered);

//delete

router.delete("/deleteuser",auth.checkToken, userControl.deleteRegistered);

//login
router.post("/login", userControl.loginRegistered);

router.post("/uploadimage",auth.checkToken,upload.single('userImage'),userControl.uploadImage);

router.post("/downloadimage",userControl.downloadImage);
//family routes
router.post("/registerfamily",auth.checkToken, familyControl.registerFamily);
router.patch("/updatefamily",auth.checkToken, familyControl.updateFamily);
router.get("/countfamily",auth.checkToken, familyControl.selectFamily);
router.delete("/deletefamily",auth.checkToken, familyControl.deleteFamily);

module.exports = router;
