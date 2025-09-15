const express = require('express');
const router = express.Router();
const questionController = require('../controller/QuestionController');

router.route('/')
    .post(questionController.createQuestion)
    .get(questionController.getAllQuestions);

router.route('/id/:id')
    .get(questionController.getQuestionById)
    .put(questionController.updateQuestionById)
    .delete(questionController.deleteQuestion);

module.exports = router;
