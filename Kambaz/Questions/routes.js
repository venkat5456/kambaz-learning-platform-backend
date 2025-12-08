const {
  findQuestionsForQuiz,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require("./dao.js");

module.exports = (app) => {
  // GET all questions for a quiz
  app.get("/api/quizzes/:qid/questions", async (req, res) => {
    try {
      const questions = await findQuestionsForQuiz(req.params.qid);
      res.json(questions);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching questions");
    }
  });

  // CREATE a question
  app.post("/api/quizzes/:qid/questions", async (req, res) => {
    try {
      const question = await createQuestion(req.params.qid, req.body);
      res.json(question);
    } catch (err) {
      console.error("🔥 CREATE QUESTION ERROR:", err);
      res.status(500).send("Error creating question");
    }
  });

  // UPDATE question
  app.put("/api/questions/:questionId", async (req, res) => {
    try {
      const updated = await updateQuestion(req.params.questionId, req.body);
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating question");
    }
  });

  // DELETE question
  app.delete("/api/questions/:questionId", async (req, res) => {
    try {
      await deleteQuestion(req.params.questionId);
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting question");
    }
  });
};
