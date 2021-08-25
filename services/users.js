const {User} = require('../models');

const getOne = filter => {
  return User.findOne(filter);
}; //проверяем, если ли уже такой имейл

const add = ({password, ...rest}) => {
  const newUser = new User(rest);
  newUser.setPassword(password); //пароль сначала хешируем (в Схеме), а потом передаем как свойсво объекта
  return newUser.save();
}; // добавляем нового пользователя

const getById = id => User.findById(id);

const update = (id, updateUser) =>
  User.findByIdAndUpdate(id, updateUser, {new: true}); //обновляем токен в поле token пользователя

module.exports = {getOne, add, getById, update};
