const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        maxlength: 2
    },
    name: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
        default: 'All Levels'
    },
    isPopular: {
        type: Boolean,
        default: false
    },
    activeUsers: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[0-9]+[KM+]*$/.test(v);
            },
            message: props => `${props.value} is not a valid active user format!`
        }
    }
});

module.exports = mongoose.model('Language', LanguageSchema);
