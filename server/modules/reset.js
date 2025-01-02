const database = require("../../database/mysql.js");

module.exports = (req, res) => {
  const { token } = req.params;
  database.query("SELECT * FROM user WHERE token = ?", [token], (err, user) => {
    if (err) {
      console.log(err.stack);
      return;
    }
    user = user[0];
    if (user != undefined) {
      res.render("reset.ejs", { token: token });
    } else {
      res.status(404).send("Token Invalid atau Expired");
    }
  });
};
