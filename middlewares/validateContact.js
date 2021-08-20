const Joi = require('joi');
// const emailRegExp = new RegExp(
//   '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
// );

const contactSchema = Joi.object({
  name: Joi.string().required(),
  // email: Joi.string().pattern(emailRegExp).required(), //validation with RegExp
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
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
