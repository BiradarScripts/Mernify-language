const Progress = require('../models/Progress');  // Import the Progress model

// Create or initialize user progress
exports.createOrUpdateProgress = async (req, res) => {
  try {
    const { user } = req.body;

    // Check if progress already exists for the user
    let progress = await Progress.findOne({ user });
    if (!progress) {
      // Create new progress entry
      progress = new Progress({ user });
    } else {
      // Update the learning streak or other details if needed
      progress.learningStreak += 1;
    }

    await progress.save();
    res.status(200).json({ message: 'Progress initialized or updated successfully', progress });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user progress
exports.getProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await Progress.findOne({ user: userId }).populate('user');
    if (!progress) {
      return res.status(404).json({ error: 'Progress not found' });
    }
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update XP and Achievements
exports.updateXPAndAchievements = async (req, res) => {
  try {
    const { userId } = req.params;
    const { xp, achievementType } = req.body;

    const progress = await Progress.findOne({ user: userId });
    if (!progress) {
      return res.status(404).json({ error: 'Progress not found' });
    }

    // Update total XP and level
    progress.totalXP += xp;
    progress.currentLevel = Math.floor(progress.totalXP / 100) + 1;

    // Update achievement progress
    if (achievementType && progress.achievements[achievementType] !== undefined) {
      progress.achievements[achievementType] += xp;
    }

    await progress.save();
    res.status(200).json({ message: 'XP and achievements updated successfully', progress });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add recent activity
exports.addActivity = async (req, res) => {
  try {
    const { userId } = req.params;
    const { activity, xp } = req.body;

    const progress = await Progress.findOne({ user: userId });
    if (!progress) {
      return res.status(404).json({ error: 'Progress not found' });
    }

    progress.recentActivities.unshift({ activity, xp });
    progress.totalXP += xp;
    progress.currentLevel = Math.floor(progress.totalXP / 100) + 1;

    await progress.save();
    res.status(200).json({ message: 'Activity added successfully', progress });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Reset progress (optional)
exports.resetProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await Progress.findOneAndUpdate(
      { user: userId },
      { learningStreak: 0, totalXP: 0, currentLevel: 1, achievements: {}, recentActivities: [] },
      { new: true }
    );

    if (!progress) {
      return res.status(404).json({ error: 'Progress not found' });
    }

    res.status(200).json({ message: 'Progress reset successfully', progress });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
