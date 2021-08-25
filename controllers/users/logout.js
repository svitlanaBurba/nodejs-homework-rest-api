const {users: service} = require('../../services');

const logout = async (req, res, next) => {
  try {
    const {_id: id} = req.user; // забираем id из req.user
    await service.update(id, {token: null}); //устанавливаем токен null в поле token пользователя в БД
    res.json({
      status: 'success',
      code: 204,
      message: 'Logout success'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
