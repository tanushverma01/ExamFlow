const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Exam", examSchema);
