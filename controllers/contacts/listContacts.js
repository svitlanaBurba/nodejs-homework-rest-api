const {contacts: service} = require('../../services');

const listContacts = async (req, res, next) => {
  try {
    const filter = {owner: req.user._id}; //условие фильтра: для всех контактов с соотв. id в поле owner контакта

    const {favorite} = req.query; //парсим параметры запроса GET
    if (favorite && favorite === 'true') {
      //если favorite === 'true', то добавляем в фильтр property favorite
      filter.favorite = true;
    }

    const {page = 1, limit = 10} = req.query;

    const result = await service.getAll({page, limit}, filter);
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

module.exports = listContacts;
