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

router.post("/create-exam", auth, role("admin"), async (req, res) => {
  const { title, description } = req.body;

  await Exam.create({
    title,
    description,
    createdBy: req.user.id
  });

  res.redirect("/admin/dashboard");
});


module.exports = router;