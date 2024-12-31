const database = require("../../database/mysql.js");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    console.log("woy");
    const { username, email } = req.body;
    const passwordHashed = await bcrypt.hash(req.body.password, 10);
    database.query(
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
};
