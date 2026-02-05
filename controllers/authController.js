const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed, role });
  res.redirect("/login");
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("User not found");

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.send("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);
  res.redirect(user.role === "admin" ? "/admin" : "/student");
};
