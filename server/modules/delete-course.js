const database = require("../../database/mysql.js");
const path = require("path");
const fs = require("fs");
const filepath = path.join(process.cwd(), "/public/img/upload/");

module.exports = (req, res) => {
  const { lesson_id } = req.body;
  database.query(
    "SELECT image FROM step WHERE lesson_id=?",
    [lesson_id],
    (err, steps) => {
      if (err) {
        console.log(err.stack);
        return;
      }

      steps.forEach((step) => {
        console.log(step);
        if (step.image !== null) {
          fs.unlinkSync(filepath + step.image);
        }
      });
    }
  );

  database.query(
    "SELECT tumb_image FROM tutorial WHERE lesson_id=?",
    [lesson_id],
    (err, tutorial) => {
      if (err) {
        console.log(err.stack);
        return;
      }
      console.log(tutorial[0].tumb_image);
      fs.unlinkSync(filepath + tutorial[0].tumb_image);
    }
  );

  database.query("DELETE FROM step WHERE lesson_id=?", [lesson_id], (err) => {
    if (err) {
      console.log(err.stack);
    }
    database.query(
      "DELETE FROM tutorial WHERE lesson_id=?",
      [lesson_id],
      (err) => {
        if (err) {
          console.log(err.stack);
        }
        res.redirect("/editTutorial");
      }
    );
  });
};
