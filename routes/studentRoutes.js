const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const Exam = require("../models/Exam");

// Student dashboard
router.get("/dashboard", auth, role("student"), async (req, res) => {
  const exams = await Exam.find();
  res.render("student/dashboard", { exams });
});

// Take exam
router.get("/exam/:id", auth, role("student"), async (req, res) => {
  const exam = await Exam.findById(req.params.id);
  res.render("exam/takeExam", { exam });
});

// Submit exam
router.post("/submit/:id", auth, role("student"), async (req,res)=>{
  res.send("Exam submitted (evaluation next)");
});

module.exports = router;
