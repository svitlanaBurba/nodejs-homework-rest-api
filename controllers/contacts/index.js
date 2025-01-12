const listContacts = require('./listContacts');
const getContactById = require('./getContactById');
const removeContact = require('./removeContact');
const addContact = require('./addContact');
const updateContact = require('./updateContact');
const updateField = require('./updateField');
const getFavorite = require('./getFavorite');

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateField,
  getFavorite
};
