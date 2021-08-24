const express = require('express'); // экспортируем экспресс для создания роутов
const router = express.Router(); //создаем роутер

const {users: ctrl} = require('../../controllers');
const {validateUser, authentificate} = require('../../middlewares');
const {
  user: {joiSchema, joiSubscriptionSchema}
} = require('../../models/schemas/');

router.post('/signup', validateUser(joiSchema), ctrl.signup); // роутер для регистрации
router.post('/login', validateUser(joiSchema), ctrl.login); // роутер для логина
router.post('/logout', authentificate, ctrl.logout); // роутер для выхода
router.get('/current', authentificate, ctrl.getCurrentUser); // роутер для выхода
router.patch(
  '/current',
  authentificate,
  validateUser(joiSubscriptionSchema),
  ctrl.updateSubscription
); // роутер для обновления поля subscription

module.exports = router;
