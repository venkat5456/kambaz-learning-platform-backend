const QuestionModel = require("./model.js");
const QuizModel = require("../Quizzes/model.js");

// ⭐ Get all questions for a quiz
const findQuestionsForQuiz = async (quizId) => {
  return await QuestionModel.find({ quiz: quizId });
};

// ⭐ Create question AND attach to quiz
const createQuestion = async (quizId, questionData) => {
  // 1. Create the question
  const newQuestion = await QuestionModel.create({
    ...questionData,
    quiz: quizId
  });

  // 2. Push question ID into quiz.questions[]
  await QuizModel.findByIdAndUpdate(
    quizId,
    {
      $push: { questions: newQuestion._id },
      $inc: { questionsCount: 1 }
    },
    { new: true }
  );

  return newQuestion;
};

// ⭐ Update
const updateQuestion = async (questionId, updates) => {
  return await QuestionModel.findByIdAndUpdate(
    questionId,
    updates,
    { new: true }
  );
};

// ⭐ Delete
const deleteQuestion = async (questionId) => {
  return await QuestionModel.findByIdAndDelete(questionId);
};

module.exports = {
  findQuestionsForQuiz,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
