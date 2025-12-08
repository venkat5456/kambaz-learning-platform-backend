const mongoose = require("mongoose");

const QuizAttemptSchema = new mongoose.Schema(
  {
    // FIXED: Quiz ID is a STRING in your system (e.g., "Q101")
    quiz: { type: String, ref: "Quiz", required: true },

    // FIXED: Student ID is STRING like "U101"
    student: { type: String, ref: "User", required: true },

    answers: [
      {
        // FIXED: Question IDs are strings in your DB
        question: { type: String, ref: "Question", required: true },

        answer: mongoose.Schema.Types.Mixed, 
        correct: { type: Boolean, default: false },
      }
    ],

    score: { type: Number, default: 0 },
    maxScore: { type: Number, default: 0 },

    attemptNumber: { type: Number, required: true },
  },
  { timestamps: true, collection: "quiz_attempts" }
);

module.exports = mongoose.model("QuizAttempt", QuizAttemptSchema);
