const jwt = require('jsonwebtoken'); //библиотека для генерации вебтокенов

const {users: service} = require('../../services');

const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await service.getOne({email});
    if (!user || !user.comparePassword(password)) {
      //Проверка, зарегистр. ли пользователь с таким email и правильный ли пароль
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Email or password is wrong'
      });
    }
    // if (!user) {//Проверка, зарегистр. ли пользователь с таким email
    //   return res.status(404).json({
    //     status: 'error',
    //     code: 404,
    //     message: 'Not found'
    //   });
    // }
    // if (!user.comparePassword(password)) {//Проверка, правильный ли пароль
    //   return res.status(400).json({
    //     status: 'error',
    //     code: 400,
    //     message: 'Wrong password'
    //   });
    // }
    const payload = {
      id: user._id
    };
    const {SECRET_KEY} = process.env; //секретный ключ для генерации токена из переменной окружения
    const token = jwt.sign(payload, SECRET_KEY); // если проверки пройдены, генерируем и отправляем токен в теле запроса
    await service.update(user._id, {token}); //дописываем токен в теле запроса;
    res.json({
      status: 'success',
      code: 200,
      data: {
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
