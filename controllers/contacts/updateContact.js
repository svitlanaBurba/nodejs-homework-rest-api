const contacts = require('../../model/contacts.json');

const updateContact = (req, res) => {
  const {contactId} = req.params;
  const {body} = req;

  const index = contacts.findIndex(
    contact => contact.id.toString() === contactId
  );
  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    });
  }
  const updateContact = {...req.body, id: contactId};
  contacts[index] = updateContact;
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: updateContact
    }
  });
};

module.exports = updateContact;
