const contacts = require('../../model/contacts.json');

const findMaxId = () => {
  try {
    const arrayId = contacts.map(contact => contact.id);
    const maxId = Math.max(...arrayId);
    return maxId;
  } catch (error) {
    throw error;
  }
};

module.exports = findMaxId;
