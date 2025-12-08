const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },

    title: { type: String, required: true },

    type: {
      type: String,
      enum: ["MCQ", "TRUE_FALSE", "FILL_BLANK"],
      default: "MCQ",
    },

    points: { type: Number, default: 0 },

    // For MCQ
    options: [
      {
        text: String,
        correct: Boolean,
      },
    ],

    // For TRUE/FALSE
    correctBoolean: { type: Boolean },

    // For FILL IN THE BLANK
    blanks: [String],         // the blanks the user fills
    correctAnswers: [String], // correct answers

  },
  { collection: "questions" }
);

module.exports = mongoose.model("Question", QuestionSchema);
