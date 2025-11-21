const CoursesDao = require("./dao.js");
const EnrollmentsDao = require("../Enrollments/dao.js");

module.exports = function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  const enrollmentsDao = EnrollmentsDao(db);

  // 🔐 Middleware — Only Faculty can modify courses
  const requireFaculty = (req, res, next) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser || currentUser.role !== "FACULTY") {
      return res
        .status(403)
        .json({ message: "Only faculty can modify courses" });
    }
    next();
  };

  // 📌 Retrieve all courses
  const findAllCourses = (req, res) => {
    const courses = dao.findAllCourses();
    res.json(courses);
  };

  // 📌 Retrieve courses for session user or specific user
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;

    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.sendStatus(401);
      }
      userId = currentUser._id;
    }

    const courses = dao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  // 📌 Create a course & auto enroll the creator
  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = dao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  // 📌 Update an existing course
  const updateCourse = (req, res) => {
    const { courseId } = req.params;
    const updates = req.body;
    const updated = dao.updateCourse(courseId, updates);
    res.json(updated);
  };

  // 📌 Delete a course
  const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.json(status);
  };

  // ROUTES — must stay in this order
  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

  // 🔐 Faculty-protected operations
  app.post("/api/users/current/courses", requireFaculty, createCourse);
  app.put("/api/courses/:courseId", requireFaculty, updateCourse);
  app.delete("/api/courses/:courseId", requireFaculty, deleteCourse);
};
