let todos = [
  { id: 1, title: "Task 1", completed: false, description: "Default description" },
  { id: 2, title: "Task 2", completed: true, description: "Default description" },
  { id: 3, title: "Task 3", completed: false, description: "Default description" },
  { id: 4, title: "Task 4", completed: true, description: "Default description" },
];

/*************** CALLBACK FUNCTIONS ***************/

// CREATE
const createNewTodo = (req, res) => {
  const newTodo = {
    id: new Date().getTime(),
    title: "New Task",
    completed: false,
    description: "New Description"
  };
  todos.push(newTodo);
  res.json(todos);
};

// READ ALL (with filtering)
const getTodos = (req, res) => {
  const { completed } = req.query;
  if (completed !== undefined) {
    const completedBool = completed === "true";
    const filtered = todos.filter((t) => t.completed === completedBool);
    res.json(filtered);
    return;
  }
  res.json(todos);
};

// READ ONE BY ID
const getTodoById = (req, res) => {
  const { id } = req.params;
  const todo = todos.find((t) => t.id === parseInt(id));
  res.json(todo);
};

// UPDATE TITLE
const updateTodoTitle = (req, res) => {
  const { id, title } = req.params;
  const todo = todos.find((t) => t.id === parseInt(id));
  if (todo) todo.title = title;
  res.json(todos);
};

// UPDATE COMPLETED
const updateTodoCompleted = (req, res) => {
  const { id, completed } = req.params;
  const todo = todos.find((t) => t.id === parseInt(id));
  if (todo) todo.completed = completed === "true";
  res.json(todos);
};

// UPDATE DESCRIPTION
const updateTodoDescription = (req, res) => {
  const { id, description } = req.params;
  const todo = todos.find((t) => t.id === parseInt(id));
  if (todo) todo.description = description;
  res.json(todos);
};

// DELETE
const removeTodo = (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id === parseInt(id));
  if (index >= 0) todos.splice(index, 1);
  res.json(todos);
};

/*************** ROUTES ***************/

module.exports = function(app) {
  app.get("/lab5/todos/create", createNewTodo);
  app.get("/lab5/todos/:id/delete", removeTodo);
  app.get("/lab5/todos/:id/title/:title", updateTodoTitle);
  app.get("/lab5/todos/:id/completed/:completed", updateTodoCompleted);
  app.get("/lab5/todos/:id/description/:description", updateTodoDescription);
  app.get("/lab5/todos", getTodos);
  app.get("/lab5/todos/:id", getTodoById);
};

