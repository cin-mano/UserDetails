// const { json } = require("express");
const Joi = require("joi");

const createSchema = Joi.object().keys({
  phone: Joi.string().min(10).required(),
  countryCode: Joi.string().required(),
  pin: Joi.string().required(),
});

const updateSchema = Joi.object().keys({
  phone: Joi.string().min(10),
  oldCountryCode:Joi.string().required(),
  newCountryCode:Joi.string().required(),
  pin: Joi.string(),
  contacts: Joi.array().items(
    Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      phone: Joi.string().min(10),
    })
  ),
});

const loginSchema = Joi.object().keys({
  phone: Joi.string().min(10).required(),
  countryCode: Joi.string().required(),
  pin: Joi.string().required(),
});

module.exports = { createSchema, updateSchema, loginSchema };
