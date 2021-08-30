const validateContact = require('./validateContact');
const validateUser = require('./validateUser');
const authentificate = require('./authentificate');
const uploadMiddleware = require('./uploadMiddleware');

module.exports = {
  validateContact,
  validateUser,
  authentificate,
  uploadMiddleware
};
