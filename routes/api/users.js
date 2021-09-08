const express = require('express'); // экспортируем экспресс для создания роутов
const router = express.Router(); //создаем роутер

const {users: ctrl} = require('../../controllers');
const {
  validateUser,
  authentificate,
  uploadMiddleware
} = require('../../middlewares');
const {
  user: {joiSchema, joiSubscriptionSchema}
} = require('../../models/schemas/');

router.post('/signup', validateUser(joiSchema), ctrl.signup); // роутер для регистрации

router.get('/verify/:verifyToken', ctrl.verify);
router.post('/verify', ctrl.verifyResend); // на защищенные роуты используем мидлвару authentificate

router.post('/login', validateUser(joiSchema), ctrl.login); // роутер для логина
router.post('/logout', authentificate, ctrl.logout); // роутер для выхода

router.get('/current', authentificate, ctrl.getCurrentUser); // роутер для выхода
router.patch(
  '/current',
  authentificate,
  validateUser(joiSubscriptionSchema),
  ctrl.updateSubscription
); // роутер для обновления поля subscription
router.patch(
  '/avatars',
  authentificate,
  uploadMiddleware.single('avatar'),
  ctrl.uploadUpdateAvatar
); // роутер для обновления поля avatars

module.exports = router;
