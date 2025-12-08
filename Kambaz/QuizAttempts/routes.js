const Attempt = require("./model.js");
const Quiz = require("../Quizzes/model.js");
const Question = require("../Questions/model.js");

module.exports = (app) => {

  // Helper: fallback studentId when NOT logged in
  const getStudentId = (req) => {
    return req.session?.currentUser?._id || "anonymous";
  };

  // 🟩 Create a new attempt (student submits answers)
  app.post("/api/quizzes/:qid/attempt", async (req, res) => {
    try {
      const quizId = req.params.qid;
      const studentId = getStudentId(req); // <— NOT requiring login anymore
      const submitted = req.body.answers;

      const quiz = await Quiz.findById(quizId).populate("questions");
      if (!quiz) return res.status(404).send("Quiz not found");

      // Count attempts per student
      const attemptsCount = await Attempt.countDocuments({
        quiz: quizId,
        student: studentId
      });

      // Enforce numberOfAttempts ONLY if user is logged in
      if (studentId !== "anonymous") {
        if (attemptsCount >= quiz.numberOfAttempts && !quiz.multipleAttempts) {
          return res.status(403).send("No attempts left");
        }
      }

      let totalScore = 0;
      let maxScore = 0;

      const gradedAnswers = await Promise.all(
        quiz.questions.map(async (q) => {
          const studentAns = submitted[q._id];
          maxScore += q.points || 0;

          let isCorrect = false;

          // MCQ grading
          if (q.type === "MCQ") {
            const correctOption = q.options.find(o => o.correct);
            isCorrect = correctOption?.text === studentAns;
          }

          // True/False grading
          if (q.type === "TRUE_FALSE") {
            isCorrect = q.correctBoolean === studentAns;
          }

          // Fill-in-the-blank grading
          if (q.type === "FILL_BLANK") {
            isCorrect = q.correctAnswers.some(
              ans => ans.toLowerCase().trim() === studentAns?.toLowerCase().trim()
            );
          }

          if (isCorrect) totalScore += q.points || 0;

          return {
            question: q._id,
            answer: studentAns,
            correct: isCorrect,
          };
        })
      );

      const attempt = await Attempt.create({
        quiz: quizId,
        student: studentId,
        answers: gradedAnswers,
        score: totalScore,
        maxScore: maxScore,
        attemptNumber: attemptsCount + 1,
      });

      res.json(attempt);
    } catch (err) {
      console.log("🔥 ATTEMPT ERROR:", err);
      res.status(500).send("Error submitting attempt");
    }
  });

  // 🟦 Get last attempt (anonymous users see their own anonymous attempts)
  app.get("/api/quizzes/:qid/attempt/last", async (req, res) => {
    const studentId = getStudentId(req);
    const quizId = req.params.qid;

    const lastAttempt = await Attempt
      .findOne({ quiz: quizId, student: studentId })
      .sort({ attemptNumber: -1 })
      .populate("answers.question");

    res.json(lastAttempt || null);
  });

  // 🟨 Get all attempts for this quiz
  app.get("/api/quizzes/:qid/attempts", async (req, res) => {
    const studentId = getStudentId(req);
    const quizId = req.params.qid;

    const attempts = await Attempt
      .find({ quiz: quizId, student: studentId })
      .sort({ attemptNumber: -1 });

    res.json(attempts);
  });
};
