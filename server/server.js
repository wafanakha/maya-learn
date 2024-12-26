if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const database = require("../database/mysql.js");
const daftar = require("./daftar.js");
const forgor = require("./forgor.js");
const tokenAuth = require("./tokenreset.js");
const reset = require("./reset.js");

const express = require("express");
const app = express();
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

const methodOverride = require("method-override");

database.query(
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

app.use(fileUpload());
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
app.use(
  fileUpload({
      limits: {
          fileSize: 10000000,
      },
      abortOnLimit: true,
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
app.get('/tutorial', (req, res) => {
  res.render('tutorialdesc.ejs');
})
app.get("/nyoba", (req, res) => {
  res.render("nyoba.ejs");
});


app.post("/daftar", checkNotAuth, (req, res) => {
  daftar(req, res);
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
  forgor(req, res);
});

app.get("/reset/:token", (req, res) => {
  tokenAuth(req, res);
});

app.post("/reset", (req, res) => {
  reset(req, res);
});

app.delete("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.post('/nyoba', (req, res) => {
  const { image } = req.files;
  if (!image) return res.sendStatus(400);

  if (!/^image/.test(image.mimetype)) return res.sendStatus(400);

  image.mv( process.cwd() + '/public/img/upload/' + image.name);
  res.sendStatus(200);
})
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
