require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");

const Hello = require("./Hello.js");
const Lab5 = require("./Lab5/index.js");

// Load Kambaz Database
const db = require("./Kambaz/Database");

// Routes
const UserRoutes = require("./Kambaz/Users/routes.js");
const CourseRoutes = require("./Kambaz/Courses/routes.js");
const ModulesRoutes = require("./Kambaz/Modules/routes.js");
const AssignmentsRoutes = require("./Kambaz/Assignments/routes.js");
const EnrollmentsRoutes = require("./Kambaz/Enrollments/routes.js");
const QuizzesRoutes = require("./Kambaz/Quizzes/routes.js");
const QuestionsRoutes = require("./Kambaz/Questions/routes.js");
const QuizAttemptsRoutes = require("./Kambaz/QuizAttempts/routes.js");

/* -----------------------------
   MongoDB Connection
 ------------------------------*/
const CONNECTION_STRING = process.env.MONGO_URI;

mongoose
  .connect(CONNECTION_STRING)
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch((err) => console.log("MongoDB Connection Error ❌", err));

/* -----------------------------
        Express App Setup
 ------------------------------*/
const app = express();
app.set("trust proxy", 1);

/* -----------------------------
        CORS  (FIXED ONLY THIS PART)
 ------------------------------*/
const allowedOrigins = [
  "http://localhost:3000",
  "https://kambaz-next-js-a6-sigma.vercel.app",
  "https://kambaz-next-js-oxru.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow non-browser tools
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS blocked: " + origin));
      }
    },
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

/* -----------------------------
        JSON Body Parsing
 ------------------------------*/
app.use(express.json());

/* -----------------------------
        Session Handling
 ------------------------------*/
const isProduction = process.env.NODE_ENV === "production";

app.use(
  session({
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

/* -----------------------------
   Debug & Cache Fix
 ------------------------------*/
app.get("/debug/session", (req, res) => {
  res.json({
    session: req.session,
    currentUser: req.session?.currentUser || null,
  });
});

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

/* -----------------------------
           API Routes
 ------------------------------*/
Hello(app);
Lab5(app);

UserRoutes(app);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db);
QuizzesRoutes(app, db);
QuestionsRoutes(app, db);
QuizAttemptsRoutes(app);

/* -----------------------------
           Start Server
 ------------------------------*/
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
