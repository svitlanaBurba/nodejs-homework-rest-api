const express = require('express'); // экспортируем экспресс для создания роутов
const router = express.Router(); //создаем роутер

const {contacts: ctrl} = require('../../controllers');
const {validateContact} = require('../../middlewares');
const {ctrlWrapper} = require('../../utils'); // перенос try... catch в обертку над контроллером

router.get('/', ctrl.listContacts);
router.get('/:contactId', ctrlWrapper(ctrl.getContactById));
router.post('/', validateContact, ctrl.addContact);
router.put('/:contactId', validateContact, ctrlWrapper(ctrl.updateContact));
router.patch('/:contactId/favorite', ctrlWrapper(ctrl.updateField));
router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));

module.exports = router;
