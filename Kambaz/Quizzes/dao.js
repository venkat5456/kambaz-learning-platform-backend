import QuizModel from "./model.js";

// Get all quizzes for a course
export const findQuizzesForCourse = (cid) =>
  QuizModel.find({ course: cid }).sort({ availableFrom: 1 });

// Create a new quiz
export const createQuiz = (cid) =>
  QuizModel.create({
    title: "New Quiz",
    course: cid,
  });

// Get quiz by ID
export const findQuizById = (qid) => QuizModel.findById(qid);

// Update quiz
export const updateQuiz = (qid, quiz) =>
  QuizModel.findByIdAndUpdate(qid, quiz, { new: true });

// Delete quiz
export const deleteQuiz = (qid) => QuizModel.findByIdAndDelete(qid);

// Toggle publish status
export const togglePublish = async (qid) => {
  const quiz = await QuizModel.findById(qid);
  quiz.published = !quiz.published;
  await quiz.save();
  return quiz;
};
