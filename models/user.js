const {model} = require('mongoose');

const {
  user: {userSchema}
} = require('./schemas');

const User = model('user', userSchema); //создаем модель на основе схемы

module.exports = User;
