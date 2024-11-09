const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);

module.exports = router;
