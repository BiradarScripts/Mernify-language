const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProgressSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Referencing the user model
    required: true
  },
  learningStreak: {
    type: Number,  // Tracks the number of consecutive days of activity
    default: 0
  },
  totalXP: {
    type: Number,  // Total experience points earned by the user
    default: 0
  },
  currentLevel: {
    type: Number,  // The current level of the user
    default: 1
  },
  achievements: {
    wordWizard: {
      type: Number,  // Percentage progress toward 'Word Wizard' achievement
      default: 0
    },
    conversationMaster: {
      type: Number,  // Percentage progress toward 'Conversation Master' achievement
      default: 0
    },
    grammarGuru: {
      type: Number,  // Percentage progress toward 'Grammar Guru' achievement
      default: 0
    }
  },
  recentActivities: [
    {
      activity: {
        type: String,  // Description of the recent activity, e.g., "Completed Lesson: Greetings"
        required: true
      },
      xp: {
        type: Number,  // Experience points earned from the activity
        default: 0
      },
      date: {
        type: Date,  // Date of the activity
        default: Date.now
      }
    }
  ]
}, { timestamps: true });  // Adds createdAt and updatedAt timestamps

const Progress = mongoose.model('Progress', ProgressSchema);

module.exports = Progress;
