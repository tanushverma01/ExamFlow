const express = require("express");
const auth = require("./middleware/authMiddleware");
const role = require("./middleware/roleMiddleware");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const cookieparser = require("cookie-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(express.json());
app.use(express.static("public"));

app.use("/api", authRoutes);
app.use("/admin", adminRoutes);
app.use("/student",studentRoutes);

// Login pages
app.get("/", (req, res) => {
  res.render("auth/login");
});

app.get("/login", (req, res) => {
  res.render("auth/login");
});

// Student dashboard

module.exports = app;
