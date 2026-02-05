const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const Exam = require("../models/Exam");


router.get("/dashboard", auth, role("admin"), (req, res) => {
  res.render("admin/dashboard");
});

router.get("/create-exam", auth, role("admin"), (req, res) => {
  res.render("admin/createExam");
});

router.post("/create-exam", async (req,res)=>{
  const { title, description, question, option1, option2, option3, option4, correct } = req.body;

  const exam = new Exam({
    title,
    description,
    questions: [{
      question,
      options: [option1, option2, option3, option4],
      correctAnswer: correct
    }]
  });

  await exam.save();
  res.redirect("/admin/dashboard");
});



module.exports = router;