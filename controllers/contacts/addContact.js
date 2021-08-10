const contacts = require('../../model/contacts.json');
const findMaxId = require('./findMax');

const addContact = (req, res) => {
  const newContact = {...req.body, id: findMaxId() + 1};
  contacts.push(newContact);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: newContact
    }
  });
};

module.exports = addContact;
