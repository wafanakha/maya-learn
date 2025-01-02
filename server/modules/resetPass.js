const database = require("../../database/mysql.js");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    const { password, token } = req.body;
    const passwordHashed = await bcrypt.hash(password, 10);

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
          database.query(
            "UPDATE user SET password = ? WHERE token = ?",
            [passwordHashed, token],
            (err) => {
              if (err) {
                console.log(err.stack);
                return;
              }
            }
          );
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
          res.redirect("/login");
        } else {
          res.status(404).send("Token Invalid atau Expired");
        }
      }
    );
  } catch {}
};
