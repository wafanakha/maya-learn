if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const nodeMailer = require("nodemailer");
const crypto = require("crypto");

const getuserbyEmail = (email) => users.find((user) => user.email === email);

const initializePassport = require("./passport-config");
initializePassport(passport, getuserbyEmail, (id) =>
  users.find((user) => user.id === id)
);

const users = [];

// app.set("views", __dirname + "/views");
// app.engine("html", require("ejs").renderFile);
app.set("view-engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
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
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/forgor", (req, res) => {
  res.render("forgor.ejs");
});
app.get("/daftar", (req, res) => {
  res.render("daftar.ejs");
});
app.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs");
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
    res.redirect("/login");
  } catch {
    res.redirect("/daftar");
  }
  console.log(users);
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
app.post("/forgor", (req, res) => {
  const email = req.body.email;
  const user = getuserbyEmail(email);
  if (user) {
    const token = crypto.randomBytes(20).toString("hex");
    user.resetToken = token;
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: "wafanakha15@gmail.com",
        pass: "rzoe bdvz rbch mima",
      },
    });
    const mailOptions = {
      from: "wafanakha15@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `Berikut adalah link untuk mereset password http://localhost:3000/reset/${token}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Tidak bisa mengirim Email");
      } else {
        console.log(`Email sent: ${info.response}`);
        res.status(200).send("lihat Email anda");
      }
    });
  } else {
    res.status(404).send("email tidak ditemukan");
  }
});

app.get("/reset/:token", (req, res) => {
  const { token } = req.params;
  if (users.some((user) => user.resetToken == token)) {
    res.render("reset-password.ejs");
  } else {
    res.status(404).send("Token Invalid atau Expired");
  }
});
app.post("/reset", (req, res) => {
  const { token, password } = req.body;
  // Find the user with the given token and update their password
  const user = users.find((user) => user.resetToken === token);
  if (user) {
    user.password = password;
    delete user.resetToken; // Remove the reset token after the password is updated
    res.status(200).send("Password updated successfully");
  } else {
    res.status(404).send("Invalid or expired token");
  }
});
app.listen(3000);
