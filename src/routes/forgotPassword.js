const express = require('express');
const router = express.Router();
const ForgotPasswordController = require('../controllers/ForgotPasswordController');

router.get('/send-mail', ForgotPasswordController.getSend);
router.post('/send-mail', ForgotPasswordController.check, ForgotPasswordController.confirmCode);
router.get('/change-password', ForgotPasswordController.getChange);
router.post('/change-password', ForgotPasswordController.confirmChange);

module.exports = router;