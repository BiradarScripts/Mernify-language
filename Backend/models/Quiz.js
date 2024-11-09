const mongoose = require('mongoose');

// Define the schema for Quiz and Challenges
const quizAndChallengesSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Assuming you have a User model
    required: true 
  },
  dailyChallengeProgress: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  availableQuizzes: [{
    name: { type: String, required: true },
    difficulty: { type: String, required: true },
    time: { type: Number, required: true }, // Time in minutes
    questions: [{
      questionText: { type: String, required: true },
      options: [{
        optionText: { type: String, required: true },
        isCorrect: { type: Boolean, required: true }
      }],
      correctAnswer: { type: String, required: true } // Correct answer for the quiz question
    }]
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Create the model from the schema
const QuizAndChallenges = mongoose.model('QuizAndChallenges', quizAndChallengesSchema);

module.exports = QuizAndChallenges;
