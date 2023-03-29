const express = require('express');
const router = express.Router();
const ResultController = require('../controllers/ResultController');

router.get('/result-list', ResultController.getResultList);
router.get('/result/:id', ResultController.getTestResult);

module.exports = router;