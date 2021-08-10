const contacts = require('../../model/contacts.json');

const removeContact = (req, res) => {
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
  const deleteContact = contacts[index];
  contacts.splice(index, 1);
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: deleteContact
    }
  });
  // res.status(204).send()
};

module.exports = removeContact;
