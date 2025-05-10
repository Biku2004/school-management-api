// utils/validation.js
const Joi = require('joi');

// Validate school data
exports.validateSchool = (data) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(1).max(255).required()
      .messages({
        'string.empty': 'School name cannot be empty',
        'string.min': 'School name must be at least 1 character long',
        'string.max': 'School name cannot exceed 255 characters',
        'any.required': 'School name is required'
      }),
    address: Joi.string().trim().min(1).max(500).required()
      .messages({
        'string.empty': 'Address cannot be empty',
        'string.min': 'Address must be at least 1 character long',
        'string.max': 'Address cannot exceed 500 characters',
        'any.required': 'Address is required'
      }),
    latitude: Joi.number().min(-90).max(90).required()
      .messages({
        'number.base': 'Latitude must be a number',
        'number.min': 'Latitude must be between -90 and 90',
        'number.max': 'Latitude must be between -90 and 90',
        'any.required': 'Latitude is required'
      }),
    longitude: Joi.number().min(-180).max(180).required()
      .messages({
        'number.base': 'Longitude must be a number',
        'number.min': 'Longitude must be between -180 and 180',
        'number.max': 'Longitude must be between -180 and 180',
        'any.required': 'Longitude is required'
      })
  });

  return schema.validate(data);
};