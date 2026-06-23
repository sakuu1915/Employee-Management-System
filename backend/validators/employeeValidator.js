const Joi = require("joi");

const employeeSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().length(10).required(),
  department: Joi.string().required(),
  designation: Joi.string().required(),
  joiningDate: Joi.date().required(),
});

module.exports = employeeSchema;