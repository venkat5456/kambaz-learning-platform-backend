const { v4: uuidv4 } = require("uuid");

module.exports = function EnrollmentsDao(db) {
  // Enroll a user into a course
  function enrollUserInCourse(userId, courseId) {
    const existing = db.enrollments.find(
      (e) => e.user === userId && e.course === courseId
    );
    if (existing) {
      return null; // conflict
    }
    const enrollment = {
      _id: uuidv4(),
      user: userId,
      course: courseId,
    };
    db.enrollments.push(enrollment);
    return enrollment;
  }

  // Get enrollments with optional filters
  function findEnrollments(userId, courseId) {
    let result = db.enrollments;
    if (userId) result = result.filter((e) => e.user === userId);
    if (courseId) result = result.filter((e) => e.course === courseId);
    return result;
  }

  // Delete enrollment by ID
  function unenrollUser(eid) {
    const index = db.enrollments.findIndex((e) => e._id === eid);
    if (index === -1) return null;
    const deleted = db.enrollments[index];
    db.enrollments.splice(index, 1);
    return deleted;
  }

  return {
    enrollUserInCourse,
    findEnrollments,
    unenrollUser,
  };
};
