const {User} = require('../models');
const nodemailer = require('nodemailer');
require('dotenv').config();

const getOne = filter => {
  return User.findOne(filter);
}; //проверяем, если ли уже такой имейл

const add = ({password, ...rest}) => {
  const newUser = new User(rest);
  console.log(newUser);
  newUser.setPassword(password); //пароль сначала хешируем (в Схеме), а потом передаем как свойсво объекта
  return newUser.save();
}; // добавляем нового пользователя

const getById = id => User.findById(id);

const getByEmail = email => User.findOne({email: email});

const getByEmailToken = emailToken => {
  const user = User.findOne({verifyToken: emailToken});
  return user;
};

const update = (id, updateUser) =>
  User.findByIdAndUpdate(id, updateUser, {new: true});

const sendVerifyEmail = (email, token) => {
  const config = {
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_LOGIN,
      pass: process.env.EMAIL_PASSWORD
    }
  };

  const transporter = nodemailer.createTransport(config); //создаем транспортный протокол и передаем ему настройки

  const emailOptions = {
    from: process.env.EMAIL_LOGIN,
    to: 'svitlana.burba@gmail.com', //email,
    subject: 'Please confirm your email',
    html: `<html><body><p>To verify your email (${email}), please follow 
          <a href='${
            'http://127.0.0.1:3000/api/users/verify/' + token
          }'> the link</a>
          </p></body></html>`
  };
  console.log(emailOptions.html);

  transporter
    .sendMail(emailOptions)
    .then(info => console.log(info))
    .catch(err => console.log(err));
};

module.exports = {
  getOne,
  add,
  getById,
  update,
  getByEmail,
  getByEmailToken,
  sendVerifyEmail
};
