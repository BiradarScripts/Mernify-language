const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.put('/lesson-progress', lessonController.updateProgress);
router.get('/lesson-progress/:userId', lessonController.getProgress);

module.exports = router;
