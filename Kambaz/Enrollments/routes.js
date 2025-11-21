const EnrollmentsDao = require("./dao.js");

module.exports = (app, db) => {
  const dao = EnrollmentsDao(db);

  // GET enrollments (optionally by user or course)
  app.get("/api/enrollments", (req, res) => {
    const { user, course } = req.query;
    const results = dao.findEnrollments(user, course);
    res.json(results);
  });

  // POST enroll
  app.post("/api/enrollments", (req, res) => {
    const { user, course } = req.body;
    const result = dao.enrollUserInCourse(user, course);

    if (!result) {
      return res.status(409).json({ message: "Already enrolled" });
    }

    res.json(result);
  });

  // DELETE unenroll
  app.delete("/api/enrollments/:eid", (req, res) => {
    const deleted = dao.unenrollUser(req.params.eid);
    if (!deleted) {
      return res.status(404).json({ message: "Enrollment not found" });
    }
    res.sendStatus(200);
  });
};
