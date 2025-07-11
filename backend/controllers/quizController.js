import User from "../models/userModel.js";

export const submitQuizAttempt = async (req, res) => {
  const { userId, quizId, score, status } = req.body;

  if (!userId || !quizId || score === undefined || !status) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const existingAttemptIndex = user.quizAttempts.findIndex(
      (attempt) => attempt.quiz_id.toString() === quizId
    );

    if (existingAttemptIndex > -1) {
      // User has attempted this quiz before, so update it
      user.quizAttempts[existingAttemptIndex].score = score;
      user.quizAttempts[existingAttemptIndex].status = status;
      user.quizAttempts[existingAttemptIndex].attempts += 1;
    } else {
      // First attempt for this quiz
      user.quizAttempts.push({
        quiz_id: quizId,
        score,
        status,
        attempts: 1,
      });
    }

    await user.save();
    res.status(200).json({ message: "Quiz attempt saved successfully.", user });

  } catch (error) {
    console.error("Error submitting quiz attempt:", error);
    res.status(500).json({ message: "Server error while saving quiz attempt." });
  }
};
