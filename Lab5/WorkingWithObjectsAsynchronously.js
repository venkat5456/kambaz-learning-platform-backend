let assignment = {
  id: 1,
  title: "Default Assignment Title",
  description: "This is the default description.",
  due: "2025-12-31",
  completed: false,
};

module.exports = function (app) {
  // GET ASSIGNMENT
  app.get("/lab5/assignment", (req, res) => {
    res.json(assignment);
  });

  // UPDATE ASSIGNMENT TITLE (GET VERSION)
  app.get("/lab5/assignment/title/:title", (req, res) => {
    const { title } = req.params;
    assignment = { ...assignment, title };
    res.json(assignment);
  });
};

