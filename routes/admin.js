const express = require('express');
const router = express.Router();

const cmsController = require('../controllers/cms');
router.get('/', cmsController.getIndex);

const adminController = require('../controllers/admin');
router.get('/users/add-user', adminController.addUser);
router.post('/users/save-user', adminController.saveUser);
router.post('/users/edit-user', adminController.editUser);
router.get('/users/delete-user', adminController.deleteUser);
router.get('/users', adminController.getUsers);
router.get('/users/:userID', adminController.getUser);


router.get('/roles/add-role', adminController.addRole);
router.post('/roles/save-role', adminController.saveRole);
router.post('/roles/edit-role', adminController.editRole);
router.get('/roles/delete-role', adminController.deleteRole);
router.get('/roles', adminController.getRoles);
router.get('/roles/:roleID', adminController.getRole);

router.get('/rules/add-rule', adminController.addRule);
router.post('/rules/save-rule', adminController.saveRule);
router.post('/rules/edit-rule', adminController.editRule);
router.get('/rules/delete-rule', adminController.deleteRule);
router.get('/rules', adminController.getRules);
router.get('/rules/:ruleID', adminController.getRule);


module.exports = router;