const createError = require('http-errors');
const {contacts: service} = require('../../services');

const updateField = async (req, res, next) => {
  const {contactId} = req.params;
  const ownerId = req.user._id;
  const result = await service.updateStatusContact(
    contactId,
    ownerId,
    req.body
  );
  if (Object.keys(req.body).length === 0) {
    const error = createError(400, 'missing field favorite');
    throw error;
  }
  if (!result) {
    const error = createError(404, `Contact with id = ${contactId} not found`);
    throw error;
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  });
};

module.exports = updateField;
