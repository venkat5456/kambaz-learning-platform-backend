const mongoose = require("mongoose");
const quizSchema = require("./schema.js");

module.exports = mongoose.model("Quiz", quizSchema);
