const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languageController');

// Route to get all languages
router.get('/', languageController.getAllLanguages);

// Route to get a language by ID
router.get('/:id', languageController.getLanguageById);

// Route to create a new language
router.post('/', languageController.createLanguage);

// Route to update a language by ID
router.put('/:id', languageController.updateLanguage);

// Route to delete a language by ID
router.delete('/:id', languageController.deleteLanguage);

module.exports = router;
