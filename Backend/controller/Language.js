const Language = require('../models/Language');

// @desc    Get all languages
// @route   GET /api/languages
// @access  Public
exports.getAllLanguages = async (req, res) => {
    try {
        const languages = await Language.find();
        res.status(200).json(languages);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching languages', error: err.message });
    }
};

// @desc    Get a single language by ID
// @route   GET /api/languages/:id
// @access  Public
exports.getLanguageById = async (req, res) => {
    try {
        const language = await Language.findById(req.params.id);
        if (!language) {
            return res.status(404).json({ message: 'Language not found' });
        }
        res.status(200).json(language);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching language', error: err.message });
    }
};

// @desc    Create a new language
// @route   POST /api/languages
// @access  Public
exports.createLanguage = async (req, res) => {
    try {
        const { code, name, level, isPopular, activeUsers } = req.body;

        // Check if language code already exists
        const existingLanguage = await Language.findOne({ code });
        if (existingLanguage) {
            return res.status(400).json({ message: 'Language code already exists' });
        }

        const newLanguage = new Language({
            code,
            name,
            level,
            isPopular,
            activeUsers
        });

        await newLanguage.save();
        res.status(201).json(newLanguage);
    } catch (err) {
        res.status(500).json({ message: 'Error creating language', error: err.message });
    }
};

// @desc    Update a language
// @route   PUT /api/languages/:id
// @access  Public
exports.updateLanguage = async (req, res) => {
    try {
        const updatedLanguage = await Language.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedLanguage) {
            return res.status(404).json({ message: 'Language not found' });
        }

        res.status(200).json(updatedLanguage);
    } catch (err) {
        res.status(500).json({ message: 'Error updating language', error: err.message });
    }
};

// @desc    Delete a language
// @route   DELETE /api/languages/:id
// @access  Public
exports.deleteLanguage = async (req, res) => {
    try {
        const deletedLanguage = await Language.findByIdAndDelete(req.params.id);

        if (!deletedLanguage) {
            return res.status(404).json({ message: 'Language not found' });
        }

        res.status(200).json({ message: 'Language deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting language', error: err.message });
    }
};
