const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

// Route to create or update user progress
router.post('/progress', progressController.createOrUpdateProgress);

// Route to get user progress by user ID
router.get('/progress/:userId', progressController.getProgress);

// Route to update XP and achievements for a user
router.put('/progress/:userId/xp', progressController.updateXPAndAchievements);

// Route to add recent activity to user progress
router.post('/progress/:userId/activity', progressController.addActivity);

// Route to reset user progress
router.put('/progress/:userId/reset', progressController.resetProgress);

module.exports = router;
