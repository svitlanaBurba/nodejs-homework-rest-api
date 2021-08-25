const {contacts: service} = require('../../services');

const getFavorite = async (req, res, next) => {
  try {
    const {favorite} = req.params;
    const filter = {owner: req.user._id, favorite: favorite}; //условие фильтра: для всех контактов с соотв. id в поле owner контакта
    const result = await service.getAll(filter);
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

module.exports = getFavorite;
