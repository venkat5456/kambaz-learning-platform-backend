const {
  findAssignments,
  findAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} = require("./dao");

module.exports = (app, db) => {
  // GET all or filtered by course
  app.get("/api/assignments", (req, res) => {
    const { course } = req.query;
    res.json(findAssignments(course));
  });

  // GET one by ID
  app.get("/api/assignments/:aid", (req, res) => {
    const assignment = findAssignmentById(req.params.aid);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json(assignment);
  });

  // POST create
  app.post("/api/assignments", (req, res) => {
    const created = createAssignment(req.body);
    res.json(created);
  });

  // PUT update
  app.put("/api/assignments/:aid", (req, res) => {
    const updated = updateAssignment(req.params.aid, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json(updated);
  });

  // DELETE remove
  app.delete("/api/assignments/:aid", (req, res) => {
    const deleted = deleteAssignment(req.params.aid);
    if (!deleted) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.sendStatus(200);
  });
};
