const database = require("../../database/mysql.js");

module.exports = (req, res) => {
  const { token, password } = req.body;
  database.query("SELECT * FROM user WHERE token = ?", [token], (err, user) => {
    if (err) {
      console.log(err.stack);
      return;
    }
    user = user[0];
    if (user != undefined) {
      database.query("UPDATE user SET password = ? WHERE token = ?"),
        [password, token],
        (err) => {
          if (err) {
            console.log(err.stack);
            return;
          }
        };
      database.query(
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
  });
};
