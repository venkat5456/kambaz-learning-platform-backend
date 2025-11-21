const UsersDao = require("./dao.js");

module.exports = function UserRoutes(app, db) {
  const dao = UsersDao(db);

  // SIGNUP
  const signup = (req, res) => {
    const newUser = dao.createUser(req.body);
    req.session.currentUser = newUser;
    res.json(newUser);
  };

  // SIGNIN
  const signin = (req, res) => {
    const { username, password } = req.body;
    const user = dao.findUserByCredentials(username, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.currentUser = user;
    res.json(user);
  };

  // SIGNOUT
  const signout = (req, res) => {
    req.session.destroy(() => {
      res.sendStatus(200);
    });
  };

  // PROFILE
  const profile = (req, res) => {
    const user = req.session.currentUser;
    if (!user) {
      return res.sendStatus(401);
    }
    res.json(user);
  };

  // API ROUTES
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
};
