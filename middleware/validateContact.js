const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
});

const validateContact = (req, res, next) => {
  const {error} = contactSchema.validate(req.body);
  console.log(error);
  if (error) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message
    });
  }
  next();
};

module.exports = validateContact;
