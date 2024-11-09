const QuizAndChallenges = require('../models/QuizAndChallenges'); // Import the schema

// Update daily challenge progress and quizzes
const updateQuizProgress = async (req, res) => {
  try {
    const { userId, dailyChallengeProgress, availableQuizzes } = req.body;

    // Find the user's record or create a new one
    let quizData = await QuizAndChallenges.findOne({ user: userId });

    if (quizData) {
      // Update the existing data
      quizData.dailyChallengeProgress = dailyChallengeProgress;
      quizData.availableQuizzes = availableQuizzes;
      quizData.lastUpdated = Date.now(); // Update timestamp
    } else {
      // Create new data if none exists for the user
      quizData = new QuizAndChallenges({
        user: userId,
        dailyChallengeProgress,
        availableQuizzes
      });
    }

    await quizData.save();

    res.status(200).json({
      success: true,
      message: 'Quiz and Challenge data updated successfully!',
      data: quizData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to update quiz and challenge data.',
      error: error.message
    });
  }
};

// Get quiz and challenge data for a user
const getQuizProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    const quizData = await QuizAndChallenges.findOne({ user: userId });

    if (!quizData) {
      return res.status(404).json({
        success: false,
        message: 'Quiz and Challenge data not found for this user.'
      });
    }

    res.status(200).json({
      success: true,
      data: quizData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve quiz and challenge data.',
      error: error.message
    });
  }
};

// Export controller functions
module.exports = {
  updateQuizProgress,
  getQuizProgress
};
