const database = require("../../database/mysql.js");
const path = require("path");
const fs = require("fs");
const filepath = path.join(process.cwd(), "/public/img/upload/");

module.exports = (req, res) => {
  const { lesson_id } = req.body;
  console.log(lesson_id);
  database.query(
    "SELECT image FROM step WHERE lesson_id=?",
    [lesson_id],
    (err, steps) => {
      if (err) {
        console.log(err.stack);
        return;
      }
      console.log(steps);
      steps.forEach((step) => {
        console.log(step.image);
        fs.unlinkSync(filepath + step.image);
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
      console.log("delete image success!");
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
        console.log("success delete!");
        res.redirect("/editTutorial");
      }
    );
  });
};
