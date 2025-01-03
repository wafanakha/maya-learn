const express = require("express");
const database = require("../../database/mysql.js");
const bcrypt = require("bcrypt");
const flash = require("express-flash");

const app = express();
app.use(flash());

module.exports = async (req, res) => {
  try {
    const { username, email } = req.body;
    const passwordHashed = await bcrypt.hash(req.body.password, 10);

    database.query("SELECT * FROM user WHERE email=?", [email], (err, user) => {
      if (err) {
        console.log(err.stack);
      }
      if (user[0] == undefined) {
        database.query(
          "INSERT INTO user (username, password, email) VALUES (?, ?, ?)",
          [username, passwordHashed, email],
          (err) => {
            if (err) {
              console.log("Ekseksi tidak berhasil: " + err.stack);
              res.redirect("/daftar");
              return;
            }
            req.flash("success", "yes");
            res.redirect("/login");
          }
        );
      } else {
        req.flash("err", "email");
        res.redirect("/daftar");
      }
    });
  } catch {
    console.log("chatch");
  }
};
