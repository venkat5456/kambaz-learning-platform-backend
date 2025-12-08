const {
  findQuizzesForCourse,
  createQuiz,
  findQuizById,
  updateQuiz,
  deleteQuiz,
  togglePublish,
} = require("./dao.js");

module.exports = function QuizRoutes(app, db) {
  // GET quizzes for a course
  app.get("/api/courses/:cid/quizzes", async (req, res) => {
    try {
      const quizzes = await findQuizzesForCourse(req.params.cid);
      res.json(quizzes);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching quizzes");
    }
  });

  // CREATE quiz
  app.post("/api/courses/:cid/quizzes", async (req, res) => {
    try {
      const quiz = await createQuiz(req.params.cid);
      res.json(quiz);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error creating quiz");
    }
  });

  // GET single quiz
  app.get("/api/quizzes/:qid", async (req, res) => {
    try {
      const quiz = await findQuizById(req.params.qid);
      res.json(quiz);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching quiz");
    }
  });

  // UPDATE quiz
  app.put("/api/quizzes/:qid", async (req, res) => {
    try {
      const updated = await updateQuiz(req.params.qid, req.body);
      res.json(updated);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error updating quiz");
    }
  });

  // DELETE quiz
  app.delete("/api/quizzes/:qid", async (req, res) => {
    try {
      await deleteQuiz(req.params.qid);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error deleting quiz");
    }
  });

  // TOGGLE publish
  app.put("/api/quizzes/:qid/togglePublish", async (req, res) => {
    try {
      const quiz = await togglePublish(req.params.qid);
      res.json({ published: quiz.published });
    } catch (err) {
      console.log(err);
      res.status(500).send("Error toggling publish");
    }
  });
};
