if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const users = [];

// app.set("views", __dirname + "/views");
// app.engine("html", require("ejs").renderFile);
app.set("view-engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("login.ejs");
});
app.get("/forgor", (req, res) => {
  res.render("forgor.ejs");
});
app.get("/daftar", (req, res) => {
  res.render("daftar.ejs");
});

app.post("/daftar", async (req, res) => {
  try {
    const passwordHashed = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      username: req.body.username,
      email: req.body.email,
      password: passwordHashed,
    });
    res.redirect("/");
  } catch {
    res.redirect("/daftar");
  }
  console.log(users);
});
app.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/forgor",
    failureRedirect: "/daftar",
    failureFlash: true,
  })
);
app.post("/forgor", (req, res) => {});
app.listen(3000);
