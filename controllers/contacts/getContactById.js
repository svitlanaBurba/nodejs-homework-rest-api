const createError = require('http-errors');
const {contacts: service} = require('../../services');

const getContactById = async (req, res, next) => {
  const {contactId} = req.params;
  const ownerId = req.user._id;
  const result = await service.getById(contactId, ownerId);

  if (!result || result.length < 1) {
    const error = createError(404, `Contact with id = ${contactId} not found`);
    throw error;
    // return res.status(404).json({
    //   status: 'error',
    //   code: 404,
    //   message: `Contact with id = ${contactId} not found`
    // });
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  });
};
module.exports = getContactById;
