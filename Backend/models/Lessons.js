const mongoose = require('mongoose');

const interactiveLessonsSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Assuming you have a User model
    required: true 
  },
  speakingPractice: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  listeningComprehension: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  readingSkills: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  writingChallenges: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const InteractiveLessons = mongoose.model('InteractiveLessons', interactiveLessonsSchema);

module.exports = InteractiveLessons;
