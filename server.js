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
const mysql = require("mysql");
const methodOverride = require("method-override");

const getuserbyEmail = (email) => users.find((user) => user.email === email);

const initializePassport = require("./passport-config");
initializePassport(passport, getuserbyEmail, (id) =>
  users.find((user) => user.id === id)
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aezakmi",
  database: "maya",
});

db.connect((err) => {
  if (err) {
    console.log("Tidak bisa konek ke DB" + err.stack);
    return;
  }
  console.log("Terhubung ke database dengan ID " + db.threadId);
});

// app.set("views", __dirname + "/views");
// app.engine("html", require("ejs").renderFile);
app.set("view-engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("login.ejs");
});
app.get("/login", checkNotAuth, (req, res) => {
  res.render("login.ejs");
});
app.get("/forgor", checkNotAuth, (req, res) => {
  res.render("forgor.ejs");
});
app.get("/daftar", checkNotAuth, (req, res) => {
  res.render("daftar.ejs");
});
app.get("/dashboard", checkAuth, (req, res) => {
  res.render("dashboard.ejs");
});

app.post("/daftar", checkNotAuth, async (req, res) => {
  try {
    const { username, email } = req.body;
    const passwordHashed = await bcrypt.hash(req.body.password, 10);
    db.query(
      "INSERT INTO user (username, password, email) VALUES (?, ?, ?)",
      [username, passwordHashed, email],
      (err) => {
        if (err) {
          console.log("Ekseksi tidak berhasil: " + err.stack);
          res.redirect("/daftar");
          return;
        }
        res.redirect("/login");
      }
    );
  } catch {}
});
app.post(
  "/login",
  checkNotAuth,
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
app.post("/forgor", checkNotAuth, (req, res) => {
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
  const user = users.find((user) => user.resetToken === token);
  if (user) {
    user.password = password;
    delete user.resetToken;
    res.status(200).send("Password updated successfully");
  } else {
    res.status(404).send("Invalid or expired token");
  }
});

app.delete("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }
  next();
}

app.listen(5000);
