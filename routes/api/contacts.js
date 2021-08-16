const express = require('express');
const router = express.Router();

const {contacts: ctrl} = require('../../controllers');
const {validateContact} = require('../../middleware');

router.get('/', ctrl.listContacts);
router.get('/:contactId', ctrl.getContactById);
router.post('/', validateContact, ctrl.addContact);
router.put('/:contactId', validateContact, ctrl.updateContact);
router.delete('/:contactId', ctrl.removeContact);

module.exports = router;
