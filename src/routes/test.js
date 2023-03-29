const express = require('express');
const router = express.Router();
const TestController = require('../controllers/TestController');

router.get('/test-list', TestController.getTestList);
router.get('/test-detail/:id', TestController.getTestDetail);
router.get('/create-test', TestController.getCreateTest);
router.post('/test-detail', TestController.postTestDetail);
router.post('/create-test', TestController.postCreateTest);
router.get('/do-test/:id', TestController.getDoTest);
router.post('/do-test', TestController.postDoTest);


module.exports = router;