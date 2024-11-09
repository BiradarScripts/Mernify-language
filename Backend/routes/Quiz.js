const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.put('/quiz-progress', quizController.updateQuizProgress);
router.get('/quiz-progress/:userId', quizController.getQuizProgress);

module.exports = router;
