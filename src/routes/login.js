const express = require('express');
const router = express.Router();
const loginPageController = require('../controllers/LoginPageController');
router.get('/login', loginPageController.get);
router.post('/login', loginPageController.login, loginPageController.isAuthenticated, loginPageController.checkRole);
router.get('/logout', loginPageController.logout);

module.exports = router;