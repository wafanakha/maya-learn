if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const database = require("../database/mysql.js");
const daftar = require("./modules/daftar.js");
const forgor = require("./modules/forgor.js");
const tokenAuth = require("./modules/reset.js");
const reset = require("./modules/resetPass.js");
const createCourse = require("./modules/create-course.js");
const deleteCourse = require("./modules/delete-course.js");

const express = require("express");
const app = express();
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const multer = require("multer");
const path = require("path");
var connFlash = require("connect-flash");

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

app.set("view-engine", "ejs");

app.use(express.static("public"));
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
app.use(passport.authenticate("session"));

app.use(methodOverride("_method"));

const initializePassport = require("./modules/passport-config.js");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
initializePassport(passport);

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/public/img/upload/"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + file.originalname.match(/\..*$/)[0]
    );
  },
});

app.get("/", (req, res) => {
  res.redirect("/dashboard");
});

app.get("/login", checkNotAuth, (req, res) => {
  res.render("login.ejs", {
    dialog: req.flash("success"),
    login: req.flash("login"),
  });
});

app.get("/forgor", checkNotAuth, (req, res) => {
  res.render("forgor.ejs");
});

app.get("/daftar", checkNotAuth, (req, res) => {
  res.render("daftar.ejs", {
    messages: req.flash("err"),
  });
});

app.get("/dashboard", (req, res) => {
  database.query(
    "SELECT tutorial.lesson_id, tutorial.judul, tutorial.tipe, tumb_image, tutorial.durasi, user.username FROM tutorial JOIN user ON tutorial.user_id=user.user_id",
    (err, lessons) => {
      if (err) {
        console.log(err.stack);
      }
      res.render("dashboard.ejs", {
        lessons: lessons,
        isauth: req.isAuthenticated(),
      });
    }
  );
});

app.get("/create-course", checkAuth, async (req, res) => {
  res.render("makecourse.ejs", {
    err: req.flash("image"),
  });
});

app.get("/aboutus", (req, res) => {
  res.render("aboutus.ejs", { isauth: req.isAuthenticated() });
});

app.get("/editTutorial", checkAuth, (req, res) => {
  database.query(
    "SELECT * FROM tutorial WHERE user_id=?",
    [req.user.user_id],
    (err, lessons) => {
      if (err) {
        console.log(err.stack);
      }
      res.render("editTutorial.ejs", {
        lessons: lessons,
        username: req.user.username,
      });
    }
  );
});

app.get("/profile", checkAuth, (req, res) => {
  res.render("profile.ejs", {
    name: req.user.username,
    email: req.user.email,
  });
});

app.get("/allcourses", (req, res) => {
  database.query(
    "SELECT tutorial.lesson_id, tutorial.judul, tutorial.tipe, tumb_image, tutorial.durasi, user.username FROM tutorial JOIN user ON tutorial.user_id=user.user_id",
    (err, lessons) => {
      if (err) {
        console.log(err.stack);
      }
      res.render("allcourses.ejs", {
        lessons: lessons,
        isauth: req.isAuthenticated(),
      });
    }
  );
});

app.get("/coursedesc/:lesson_id", (req, res) => {
  const { lesson_id } = req.params;
  database.query(
    "SELECT judul, durasi, isi_course, tumb_image, tipe, step.image, judul_step, username FROM tutorial JOIN step ON tutorial.lesson_id=step.lesson_id JOIN user ON tutorial.user_id=user.user_id WHERE tutorial.lesson_id=?",
    [lesson_id],
    (err, lessons) => {
      if (err) {
        console.log(err.stack);
      }
      console.log("tumbnail: " + lessons[0].tumb_image);
      res.render("tutorialdesc.ejs", {
        lesson_id: lesson_id,
        lessons: lessons,
        isauth: req.isAuthenticated(),
      });
    }
  );
});

app.get("/course/:lesson_id", (req, res) => {
  const { lesson_id } = req.params;
  database.query(
    "SELECT judul, durasi, isi_course, tumb_image, tipe, step.image, judul_step, username, isi_table FROM tutorial JOIN step ON tutorial.lesson_id=step.lesson_id JOIN user ON tutorial.user_id=user.user_id WHERE tutorial.lesson_id=?",
    [lesson_id],
    (err, lessons) => {
      if (err) {
        console.log(err.stack);
      }
      console.log(lessons[0]);
      res.render("tutorial.ejs", {
        lesson_id: lesson_id,
        lessons: lessons,
        isauth: req.isAuthenticated(),
      });
    }
  );
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
    session: true,
    failureFlash: true,
  })
);

const ccupload = multer({
  storage: diskStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      req.notImage = "no image";
      return cb(null, false, new Error("Please upload a valid image file"));
    }
    cb(null, true);
  },
});

app.post(
  "/create-course",
  checkAuth,
  ccupload.fields(
    [
      { name: "tumbnailImg", maxCount: 1 },
      { name: "stepImg", maxCount: 30 },
    ],
    (req, res, err) => {
      if (err) {
        req.flash("image", "");
        res.redirect("/create-course");
      }
    }
  ),
  (req, res) => {
    console.log(req.files);
    createCourse(req, res);
  }
);

app.post("/profile", checkAuth, (req, res) => {
  const { name, email } = req.body;
  database.query(
    "UPDATE user SET username = ?, email = ?",
    [name, email],
    (err) => {
      if (err) {
        console.log(err.stack);
        return;
      }
      res.redirect("/profile");
    }
  );
});

app.post("/editTutorial", checkAuth, (req, res) => {
  deleteCourse(req, res);
});

app.post("/forgor", checkNotAuth, (req, res) => {
  forgor(req, res);
});

app.get("/reset/:token", (req, res) => {
  tokenAuth(req, res);
});

app.post("/reset/", (req, res) => {
  console.log(req.body);
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

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("autheeedd");
    return next();
  }
  req.flash("login", "need");
  res.redirect("/login");
}

function checkNotAuth(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("nooooot autheeedd");
    return res.redirect("/dashboard");
  }
  next();
}

app.listen(3000);
