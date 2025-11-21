const { v4: uuidv4 } = require("uuid");

module.exports = function ModulesDao(db) {

  function findModulesForCourse(courseId) {
    return db.modules.filter((module) => module.course === courseId);
  }

  function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    db.modules = [...db.modules, newModule];
    return newModule;
  }

  function deleteModule(moduleId) {
    db.modules = db.modules.filter((m) => m._id !== moduleId);
    return { status: "deleted" };
  }

  function updateModule(moduleId, moduleUpdates) {
    const module = db.modules.find((m) => m._id === moduleId);
    Object.assign(module, moduleUpdates);
    return module;
  }

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
};
