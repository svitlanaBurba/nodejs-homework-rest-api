const express = require('express'); // экспортируем экспресс для создания роутов
const router = express.Router(); //создаем роутер

const {contacts: ctrl} = require('../../controllers');
const {validateContact, authentificate} = require('../../middlewares');
const {ctrlWrapper} = require('../../utils'); // перенос try... catch в обертку над контроллером

router.get('/', authentificate, ctrl.listContacts); // на защищенные роуты используем мидлвару authentificate
router.get('/:contactId', authentificate, ctrlWrapper(ctrl.getContactById));
router.post('/', authentificate, validateContact, ctrl.addContact); // на защищенные роуты используем мидлвару authentificate
router.put(
  '/:contactId',
  authentificate,
  validateContact,
  ctrlWrapper(ctrl.updateContact)
);
router.patch(
  '/:contactId/favorite',
  authentificate,
  ctrlWrapper(ctrl.updateField)
);
router.delete('/:contactId', authentificate, ctrlWrapper(ctrl.removeContact));

module.exports = router;
