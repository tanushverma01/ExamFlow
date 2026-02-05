const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String
});

const examSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Exam", examSchema);
