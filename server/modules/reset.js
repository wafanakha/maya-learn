const express = require("express");
const app = express();
const database = require("../../database/mysql.js");
const bcrypt = require("bcrypt");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

module.exports = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;
    const passwordHashed = await bcrypt.hash(password, 10);
    console.log("Request headers:", req.params);
    console.log("Request body:", req.body);

    database.query(
      "SELECT * FROM user WHERE token = ?",
      [token],
      (err, user) => {
        if (err) {
          console.log(err.stack);
          return;
        }
        user = user[0];
        if (user != undefined) {
          database.query("UPDATE user SET password = ? WHERE token = ?"),
            [passwordHashed, token],
            (err) => {
              if (err) {
                console.log(err.stack);
                return;
              }
            };
          database.query(
            "UPDATE user SET token = '' WHERE password = ?",
            [passwordHashed],
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
  } catch {}
};
