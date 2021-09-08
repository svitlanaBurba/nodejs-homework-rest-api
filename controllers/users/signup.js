const gravatar = require('gravatar');
const {nanoid} = require('nanoid');

const {users: service} = require('../../services');

const signup = async (req, res, next) => {
  try {
    // сначала проверим, не занят ли емейл
    const {email, password} = req.body;
    const user = await service.getOne({email});

    // если пользователь с таким емейлом существует - шлем 409
    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email is in use'
      });
    }

    //Создаем ссылку на аватарку пользователя с помощью gravatar и полученный URL сохраняем в поле avatarURL во время создания пользователя
    req.body.avatarURL = gravatar.url(email);
    // создаем токен для верификации имейла (будет отправлен по почте)
    req.body.verifyToken = nanoid();

    req.body.verify = false; // все пользователи создаются как "неверифицированные"

    // добавим пользователя в базу (все данные из req.body)
    await service.add(req.body);

    // отправляем имейл (на время разработки всегда будем отправлять на svitlana.burba@gmail.com)
    service.sendVerifyEmail(email, req.body.verifyToken);

    // отправляем 201
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Success register'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
