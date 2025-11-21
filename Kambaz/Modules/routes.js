const ModulesDao = require("./dao.js");

module.exports = function ModulesRoutes(app, db) {
  const dao = ModulesDao(db);

  // ⭐ Anyone signed-in can VIEW modules
  const findModulesForCourse = (req, res) => {
    const { courseId } = req.params;
    const modules = dao.findModulesForCourse(courseId);
    res.json(modules);
  };

  // ⭐ Only FACULTY can CREATE modules
  const createModuleForCourse = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      return res.sendStatus(401); // Not logged in
    }
    if (currentUser.role !== "FACULTY") {
      return res.sendStatus(403); // Forbidden
    }

    const { courseId } = req.params;
    const module = { ...req.body, course: courseId };
    const newModule = dao.createModule(module);
    res.json(newModule);
  };

  // ⭐ Only FACULTY can UPDATE modules
  const updateModule = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      return res.sendStatus(401);
    }
    if (currentUser.role !== "FACULTY") {
      return res.sendStatus(403);
    }

    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const updated = dao.updateModule(moduleId, moduleUpdates);
    res.json(updated);
  };

  // ⭐ Only FACULTY can DELETE modules
  const deleteModule = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      return res.sendStatus(401);
    }
    if (currentUser.role !== "FACULTY") {
      return res.sendStatus(403);
    }

    const { moduleId } = req.params;
    const status = dao.deleteModule(moduleId);
    res.json(status);
  };

  // ROUTES
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.put("/api/modules/:moduleId", updateModule);
  app.delete("/api/modules/:moduleId", deleteModule);
};
