const { v4: uuidv4 } = require("uuid");

module.exports = function CoursesDao(db) {
  // Get ALL courses
  function findAllCourses() {
    return db.courses;
  }

  // Get only courses the signed-in user is enrolled in
  function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = db;
    const enrolledCourses = courses.filter((course) =>
      enrollments.some(
        (enrollment) =>
          enrollment.user === userId && enrollment.course === course._id
      )
    );
    return enrolledCourses;
  }

  // Create a new course
  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    db.courses = [...db.courses, newCourse];
    return newCourse;
  }

  // Delete a course and remove related enrollments
  function deleteCourse(courseId) {
    db.courses = db.courses.filter((course) => course._id !== courseId);
    db.enrollments = db.enrollments.filter(
      (enrollment) => enrollment.course !== courseId
    );
    return { status: "deleted" };
  }

  // Update existing course
  function updateCourse(courseId, courseUpdates) {
    const course = db.courses.find((course) => course._id === courseId);
    Object.assign(course, courseUpdates);
    return course;
  }

  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
};
