require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");

const Hello = require("./Hello.js");
const Lab5 = require("./Lab5/index.js");

const db = require("./Kambaz/Database/index.js");

// ⭐ Import your Kambaz feature routes
const UserRoutes = require("./Kambaz/Users/routes.js");
const CourseRoutes = require("./Kambaz/Courses/routes.js");
const ModulesRoutes = require("./Kambaz/Modules/routes.js");
const AssignmentsRoutes = require("./Kambaz/Assignments/routes.js");   // ⭐ NEW
const EnrollmentsRoutes = require("./Kambaz/Enrollments/routes.js"); // ⭐ NEW

const app = express();

// ⭐ CORS MUST allow frontend request
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
  })
);

// ⭐ Support JSON body parsing
app.use(express.json());

// ⭐ General API
Hello(app);
Lab5(app);

// ⭐ Register all Kambaz Routes
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);   // <- ⭐ MUST BE HERE
EnrollmentsRoutes(app, db);   // <- ⭐ MUST BE HERE

// ⭐ Server Start
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
