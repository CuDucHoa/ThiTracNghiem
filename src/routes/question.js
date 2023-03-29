const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/QuestionController');

router.get('/question-list/:id', QuestionController.getQuestionList);
router.get('/change-question-information/:id', QuestionController.getQuestionDetail);
router.post('/change-question-information', QuestionController.postQuestionDetail);
router.get('/create-question', QuestionController.getCreateQuestion);
router.post('/create-question', QuestionController.postCreateQuestion);

module.exports = router;