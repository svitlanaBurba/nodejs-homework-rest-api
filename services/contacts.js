const {Contact} = require('../models/');

//функции запросов к БД

const getAll = () => Contact.find({}, '_id name email phone favorite'); // Аналог filter, всегда вернет массив, даже с одним элементом

const getById = id => {
  // Contact.findOne({ _id: id }); Более общий поиск, не только id
  return Contact.findById(id, '_id name email phone favorite'); // Поиск конкретно по id
};

const add = newContact => {
  return Contact.create(newContact);
};

const updateById = (id, data) => {
  return Contact.findByIdAndUpdate(id, data, {new: true});
};

const deleteById = id => {
  return Contact.findByIdAndDelete(id);
};

const updateStatusContact = (id, data) => {
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
