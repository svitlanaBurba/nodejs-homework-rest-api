const {Contact} = require('../models/');

//функции запросов к БД

const getAll = (pagination, filter) => {
  //добавляем пагинацию
  const {page, limit} = pagination;
  const skip = page * limit - limit; //считаем, сколько пропустить записей
  return Contact.find(filter, 'id name email phone favorite', {
    skip,
    limit: Number(limit)
  });
}; // Условие фильтрации, чтобы выдать контакты, соотв. Id залогиненного пользователя (всегда вернет массив, даже с одним элементом)

const getById = (id, ownerId) => {
  // return Contact.findOne({ _id: id }); Более общий поиск, не только id
  const filter = {owner: ownerId, _id: id}; //условие фильтра: для всех контактов с соотв. id в поле owner контакта и для определенного id
  return Contact.find(filter, '_id name email phone favorite');
};

const add = newContact => {
  return Contact.create(newContact);
};

const updateById = async (id, ownerId, data) => {
  const user = await getById(id, ownerId);
  if (!user || user.length < 1) return false;
  return Contact.findByIdAndUpdate(id, data, {new: true});
};

const deleteById = async (id, ownerId) => {
  const user = await getById(id, ownerId);
  if (!user || user.length < 1) return false;
  return Contact.findByIdAndDelete(id);
};

const updateStatusContact = async (id, ownerId, data) => {
  const user = await getById(id, ownerId);
  if (!user || user.length < 1) return false;
  return Contact.findByIdAndUpdate(id, data, {new: true});
};

module.exports = {
  getAll,
  add,
  getById,
  updateById,
  deleteById,
  updateStatusContact
};
