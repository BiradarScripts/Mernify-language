const InteractiveLessons = require('../models/InteractiveLessons'); // Import the schema

// Create or update Interactive Lessons progress
const updateProgress = async (req, res) => {
  try {
    const { userId, speakingPractice, listeningComprehension, readingSkills, writingChallenges } = req.body;

    // Find the user's progress or create a new record
    let progress = await InteractiveLessons.findOne({ user: userId });

    if (progress) {
      // Update existing progress
      progress.speakingPractice = speakingPractice;
      progress.listeningComprehension = listeningComprehension;
      progress.readingSkills = readingSkills;
      progress.writingChallenges = writingChallenges;
      progress.lastUpdated = Date.now(); // Update timestamp
    } else {
      // Create a new progress record if it doesn't exist
      progress = new InteractiveLessons({
        user: userId,
        speakingPractice,
        listeningComprehension,
        readingSkills,
        writingChallenges
      });
    }

    await progress.save();

    res.status(200).json({
      success: true,
      message: 'Progress updated successfully!',
      data: progress
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to update progress.',
      error: error.message
    });
  }
};

// Get progress for a specific user
const getProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    const progress = await InteractiveLessons.findOne({ user: userId });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progress data not found for this user.'
      });
    }

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve progress.',
      error: error.message
    });
  }
};

// Export the controller functions
module.exports = {
  updateProgress,
  getProgress
};
