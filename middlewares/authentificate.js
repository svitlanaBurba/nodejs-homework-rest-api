require('dotenv').config();
const jwt = require('jsonwebtoken');

const {users: service} = require('../services');
const {SECRET_KEY} = process.env;

const authentificate = async (req, res, next) => {
  try {
    const {authorization} = req.headers; //извлекаем токен из заголовков (поле authorization), где он храниться в виде Bearer ...
    const [bearer, token] = authorization.split(' '); // записываем в массив отдельно слово Bearer и собственно токен и деструктуризируем массив в отдельные переменные

    if (bearer !== 'Bearer') {
      //проверяем на наличие слова Bearer
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized'
      });
    }

    const {id} = jwt.verify(token, SECRET_KEY); //верифицируем токен, как результат получаем payload(id)
    const user = await service.getById(id);

    if (!user || !user.token) {
      //проверяем, что пользователь есть в БД и у него есть токен в БД
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized'
      });
    }
    req.user = user; //если проверки пройдены, то записываем в реквест пользователя

    next(); // передаем обработчик дальше
  } catch (error) {
    console.log('Exception during authorization check -> 401');
    //console.log(error);
    error.status = 401;
    error.message = 'Not authorized';
    next(error);
  }
};

module.exports = authentificate;
