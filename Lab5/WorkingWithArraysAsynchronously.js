module.exports = function (app) {
  let todos = [
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Practice Node.js", completed: true },
    { id: 3, title: "Finish Lab 5", completed: false },
  ];

  // ---------------- FETCH ALL TODOS ----------------
  const fetchTodos = (req, res) => {
    res.json(todos);
  };

  // ---------------- CREATE TODO (GET method - old) ----------------
  const createNewTodo = (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Todo",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  };

  // ---------------- DELETE TODO (OLD GET VERSION) ----------------
  const removeTodo = (req, res) => {
    const { id } = req.params;
    todos = todos.filter((t) => t.id !== parseInt(id));
    res.json(todos);
  };

  // ---------------- CREATE TODO (HTTP POST - new) ----------------
  const postNewTodo = (req, res) => {
    const newTodo = {
      ...req.body,
      id: new Date().getTime(),
    };
    todos.push(newTodo);
    res.json(newTodo);
  };

  // ---------------- DELETE TODO (HTTP DELETE) ----------------
  const deleteTodo = (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === parseInt(id));

    if (index === -1) {
      res.status(404).json({
        message: `Unable to delete Todo with ID ${id}`,
      });
      return;
    }

    todos.splice(index, 1);
    res.sendStatus(200);
  };

  // ---------------- UPDATE TODO (HTTP PUT) ----------------
  const updateTodo = (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === parseInt(id));

    if (index === -1) {
      res.status(404).json({
        message: `Unable to update Todo with ID ${id}`,
      });
      return;
    }

    todos = todos.map((t) =>
      t.id === parseInt(id) ? { ...t, ...req.body } : t
    );

    res.sendStatus(200);
  };

  // ---------------- REGISTER ALL ROUTES ----------------
  app.get("/lab5/todos", fetchTodos);
  app.get("/lab5/todos/create", createNewTodo);
  app.get("/lab5/todos/:id/delete", removeTodo);

  app.post("/lab5/todos", postNewTodo);
  app.delete("/lab5/todos/:id", deleteTodo);
  app.put("/lab5/todos/:id", updateTodo);
};

