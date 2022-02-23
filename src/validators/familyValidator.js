const Joi = require("joi");

const familySchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().min(10).required(),
  relation: Joi.string().required(),
});

module.exports = familySchema;
