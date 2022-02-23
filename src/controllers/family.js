const Family = require("../models/family");
const familySchema = require("../validators/familyValidator");

const registerFamily = async (req, res, next) => {
  try {
    // console.log(req);
    const _id = req.userId;

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const relation = req.body.relation;

    const { error, value } = familySchema.validate(req.body);
    if (error) {
      res.status(400).send({
        status: 400,
        message: "Validation error",
        data: error,
      });
    }

    const familyData = new Family({
      userId: _id,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      relation: relation,
    });
    const result = await familyData.save();
    res.status(201).send({
      status: 201,
      message: "Created",
      data: result,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({
      status: 400,
      message: "Bad request",
      data: e,
    });
  }
};

const updateFamily = async (req, res, next) => {
  try {
    const _id = req.userId;

    const { error, value } = familySchema.validate(req.body);
    if (error) {
      res.status(400).send({
        status: 400,
        message: "Validation error",
        data: error,
      });
      return;
    }

    const familyData = await Family.findOneAndUpdate(
      { userId: _id,firstName:req.body.firstName,lastName:req.body.lastName, phone: req.body.phone, relation:req.body.relation}
    );
    res.status(200).send({
      status: 200,
      message: "Successfully updated",
      data: familyData,
    });
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "Bad request",
      data: e,
    });
  }
};
const selectFamily = async (req, res, next) => {
  try {
    const _id = req.userId;

    const familyData = await Family.findOne({ userId: _id }).count();
    // console.log(familyData);
    if (!familyData) {
      res.status(200).send({
        status: 200,
        message: "User not found",
        data: familyData,
      });
      return;
    }
    res.status(200).send({
      status: 200,
      message: "User Found",
      data: familyData,
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteFamily = async (req, res, next) => {
  try {
    const _id = req.userId;

    const result = await Family.findOneAndDelete({ userId: _id });
    if (!result) {
      res.status(200).send({
        status: 200,
        message: "User not found",
        data: result,
      });
      return;
    }
    res.status(200).send({
      status: 200,
      message: "Successfully deleted",
      data: result,
    });
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "Bad request",
      data: e,
    });
  }
};

module.exports = { registerFamily, updateFamily, selectFamily, deleteFamily };
