const express = require("express");
const database = require("../../database/mysql.js");
const bcrypt = require("bcrypt");
const flash = require("express-flash");
var validator = require("email-validator");

const app = express();
app.use(flash());

module.exports = async (req, res) => {
  try {
    const { username, email } = req.body;
    const passwordHashed = await bcrypt.hash(req.body.password, 10);

    console.log(validator.validate(email));
    if (!validator.validate(email)) {
      req.flash("emailnotValid", "Email yang anda masukkan tidak valid!");
      res.redirect("/daftar");
      return;
    }
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
            req.flash("success", "Registrasi akun berhasil!");
            res.redirect("/login");
          }
        );
      } else {
        req.flash("emailFound", "email sudah dipakai!");
        res.redirect("/daftar");
      }
    });
  } catch {
    console.log("chatch");
  }
};
