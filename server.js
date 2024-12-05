if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const database = require("/home/nakha/project/kuliah/maya-learn/database/mysql.js");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const nodeMailer = require("nodemailer");
const crypto = require("crypto");
const methodOverride = require("method-override");

database.db.query(
  "SELECT * FROM user WHERE email = ?",
  ["wafanakha17@gmail.com"],
  (err, user) => {
    if (err) {
      console.log(err.stack);
      return;
    }
    console.log(user[0]);
  }
);

const initializePassport = require("./passport-config");
initializePassport(passport);

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
    database.db.query(
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
  database.db.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    (err, user) => {
      if (err) {
        console.log(err.stack);
        return;
      }
      user = user[0];
      console.log(user);
      if (user != undefined) {
        const token = crypto.randomBytes(20).toString("hex");
        database.db.query(
          "UPDATE user SET token = ? WHERE email = ?",
          [token, email],
          (err) => {
            if (err) {
              console.log(err.stack);
              return;
            }
            console.log("token success");
          }
        );
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
          text: `Berikut adalah link untuk mereset password http://localhost:5000/reset/${token}`,
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
    }
  );
});

app.get("/reset/:token", (req, res) => {
  const { token } = req.params;
  database.db.query(
    "SELECT * FROM user WHERE token = ?",
    [token],
    (err, user) => {
      if (err) {
        console.log(err.stack);
        return;
      }
      user = user[0];
      if (user != undefined) {
        res.render("reset-password.ejs");
      } else {
        res.status(404).send("Token Invalid atau Expired");
      }
    }
  );
});

app.post("/reset", (req, res) => {
  const { token, password } = req.body;
  database.db.query(
    "SELECT * FROM user WHERE token = ?",
    [token],
    (err, user) => {
      if (err) {
        console.log(err.stack);
        return;
      }
      user = user[0];
      if (user != undefined) {
        database.db.query("UPDATE user SET password = ? WHERE token = ?"),
          [password, token],
          (err) => {
            if (err) {
              console.log(err.stack);
              return;
            }
          };
        database.db.query(
          "UPDATE user SET token = '' WHERE password = ?",
          [password],
          (err) => {
            if (err) {
              console.log(err.stack);
              return;
            }
          }
        );
        res.status(200).send("Password updated successfully");
      } else {
        res.status(404).send("Token Invalid atau Expired");
      }
    }
  );
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
    console.log("autheeedd");
    return next();
  }
  res.redirect("/login");
}

function checkNotAuth(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("nooooot autheeedd");
    return res.redirect("/dashboard");
  }
  next();
}

app.listen(5000);
