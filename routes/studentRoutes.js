const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const Exam = require("../models/Exam");

router.get("/dashboard", auth, role("student"), async (req, res) => {
  const exams = await Exam.find();
  res.render("student/dashboard", { exams });
});

module.exports = router;
