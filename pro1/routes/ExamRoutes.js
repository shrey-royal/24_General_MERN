const express = require('express');
const router = express.Router();
const examController = require('../controller/ExamController');

router.route('/')
    .post(examController.createExam)
    .get(examController.getAllExams);

router.route('/id/:id')
    .get(examController.getExamById)
    .put(examController.updateExamById)
    .delete(examController.deleteExam);

module.exports = router;
