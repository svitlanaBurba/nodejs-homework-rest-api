const createError = require('http-errors');
const {users: service} = require('../../services');

const updateSubscription = async (req, res, next) => {
  try {
    const {_id} = req.user; // забираем id пользователя
    const result = await service.update(_id, req.body);
    if (Object.keys(req.body).length === 0) {
      const error = createError(400, 'missing field subscription');
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
