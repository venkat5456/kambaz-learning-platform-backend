const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, default: "New Quiz" },
    description: { type: String, default: "" },

    course: { type: String, required: true },

    published: { type: Boolean, default: false },

    points: { type: Number, default: 0 },
    shuffleAnswers: { type: Boolean, default: false },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    numberOfAttempts: { type: Number, default: 1 },

    availableFrom: { type: Date, default: null },
    availableUntil: { type: Date, default: null },
    dueDate: { type: Date, default: null },

    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],

    questionsCount: { type: Number, default: 0 },
  },
  { collection: "quizzes", timestamps: true }
);

module.exports = quizSchema;
