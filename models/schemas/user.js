const {Schema} = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegExp
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter'
    },
    token: {
      type: String,
      default: null
    }
  },
  {versionKey: false, timestamps: true} //created at/updated at - in collection object
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10)); //функция хеширования пароля, используем дальше в сервисах при добавлении нового пользователся
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
  token: Joi.string(),
  subscription: Joi.string().valid('starter', 'pro', 'business')
});

const joiSubscriptionSchema = Joi.object({
  //схема валидации, когда надо передать в req.body и обновить только одно поле подписки
  subscription: Joi.string().valid('starter', 'pro', 'business')
});

module.exports = {userSchema, joiSchema, joiSubscriptionSchema};
