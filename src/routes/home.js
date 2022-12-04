const express = require('express');
const router = express.Router();
const HomePageController = require('../controllers/HomePageController');
router.get('/home', HomePageController.index);
router.get('/', HomePageController.index);

module.exports = router;