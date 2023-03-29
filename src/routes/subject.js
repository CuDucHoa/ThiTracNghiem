const express = require('express');
const router = express.Router();
const SubjectController = require('../controllers/SubjectController');

router.get('/subject-list', SubjectController.getSubjectList);
router.get('/change-subject-information/:id', SubjectController.getSubjectDetail);
router.post('/change-subject-information', SubjectController.postSubjectDetail);
router.get('/create-subject', SubjectController.getCreateSubject);
router.post('/create-subject', SubjectController.postCreateSubject);

module.exports = router;