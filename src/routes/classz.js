const express = require('express');
const router = express.Router();
const ClassController = require('../controllers/ClassController');

router.get('/class-list', ClassController.getClassList);
router.get('/change-class-information/:id', ClassController.getClassDetail);
router.post('/change-class-information', ClassController.postClassDetail);
router.get('/create-class', ClassController.getCreateClass);
router.post('/create-class', ClassController.postCreateClass);

module.exports = router;