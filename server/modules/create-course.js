const database = require("../../database/mysql.js");

module.exports = (req, res) => {
  const { judul, type, durasi, ringkasan } = req.body;
  database.query(
    "SELECT * FROM course_master WHERE user_id = ?",
    [req.user.user_id],
    (err, coursemaster) => {
      if (err) {
        console.log(err);
        return;
      }
      if (coursemaster[0] == undefined) {
        database.query(
          "INSERT INTO course_master(jumlah_course, user_id) VALUES (?,?)",
          [0, req.user.user_id],
          (err) => {
            if (err) {
              console.log(err.stack);
              return;
            }
            console.log("insert new course master success!!");
          }
        );
      }
      database.query(
        "UPDATE course_master SET jumlah_course = jumlah_course + 1 WHERE user_id = ?",
        [req.user.user_id],
        (err) => {
          if (err) {
            console.log(err.stack);
            return;
          }
          console.log("update course master success!");
        }
      );
    }
  );

  database.query(
    "INSERT INTO tutorial(judul, tipe, durasi, isi_course, coursemaster_id) VALUES (?,?,?,?,?)",
    [judul, type, durasi, ringkasan, req.user.coursemaster_id],
    (err) => {
      if (err) {
        console.log(err.stack);
        res.redirect("/dashboard");
        return;
      }
      res.redirect("/tutorial");
    }
  );
};
