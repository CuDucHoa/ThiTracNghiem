const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/AccountController');

router.get('/account-list/teacher', AccountController.getTeacherAccountList);
router.get('/account-list/student', AccountController.getStudentAccountList);
router.get('/account-information', AccountController.getAccountInfo);
router.get('/create-account', AccountController.getCreateAccount);
router.post('/create-account', AccountController.postCreateAccount);
router.get('/change-account-information/:id', AccountController.getUpdateAccount);
router.post('/change-account-information', AccountController.postUpdateAccount);

module.exports = router;