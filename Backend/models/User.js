const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date_joined: {
    type: Date,
    default: Date.now
  },
  learning_streaks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'learningStreak'
  }]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
