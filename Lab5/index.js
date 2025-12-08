const PathParameters = require("./PathParameters.js");
const QueryParameters = require("./QueryParameters.js");
const WorkingWithObjects = require("./WorkingWithObjects.js");
const WorkingWithArrays = require("./WorkingWithArrays.js");
const QuizAttemptsRoutes = require("../Kambaz/QuizAttempts/routes.js");

// NEW
const WorkingWithObjectsAsync = require("./WorkingWithObjectsAsynchronously.js");
const WorkingWithArraysAsync = require("./WorkingWithArraysAsynchronously.js");

module.exports = function (app) {

  // HTTP CLIENT
  app.get("/lab5/welcome", (req, res) => {
    res.send("Welcome to Lab 5");
  });

  // OLD LAB PARTS
  PathParameters(app);
  QueryParameters(app);
  WorkingWithObjects(app);
  WorkingWithArrays(app);

  // NEW — ASYNC PARTS
  WorkingWithObjectsAsync(app);
  WorkingWithArraysAsync(app);
  QuizAttemptsRoutes(app);

};

