const { v4: uuidv4 } = require("uuid");
const db = require("../Database/index.js");

// Reference to assignments array
let assignments = db.assignments;

// GET all or by course
const findAssignments = (courseId) => {
  if (courseId) {
    return assignments.filter((a) => a.course === courseId);
  }
  return assignments;
};

// GET one by ID
const findAssignmentById = (aid) =>
  assignments.find((a) => a._id === aid);

// CREATE
const createAssignment = (assignment) => {
  const newAssignment = { _id: uuidv4(), ...assignment };
  assignments.push(newAssignment);
  return newAssignment;
};

// UPDATE
const updateAssignment = (aid, updatedFields) => {
  const index = assignments.findIndex((a) => a._id === aid);
  if (index === -1) return null;
  assignments[index] = { ...assignments[index], ...updatedFields };
  return assignments[index];
};

// DELETE
const deleteAssignment = (aid) => {
  const index = assignments.findIndex((a) => a._id === aid);
  if (index === -1) return false;
  assignments.splice(index, 1);
  return true;
};

module.exports = {
  findAssignments,
  findAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};
