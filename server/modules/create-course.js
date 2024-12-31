const database = require("../../database/mysql.js");

module.exports = (req, res) => {
  const { judul, type, durasi, ringkasan, stepTitle, stepText } = req.body;

  database.query(
    "INSERT INTO tutorial(judul, tipe, durasi, isi_course, user_id) VALUES (?,?,?,?,?)",
    [judul, type, durasi, ringkasan, req.user.user_id],
    (err) => {
      if (err) {
        console.log(err.stack);
        return;
      }
    }
  );
  for (let i = 0; i < stepTitle.length; i++) {
    database.query(
      "INSERT INTO step SET judul_step = ?, isi_table = ?, lesson_id = (SELECT lesson_id FROM tutorial WHERE judul = ?)",
      [stepTitle[i], stepText[i], judul],
      (err) => {
        if (err) {
          console.log(err.stack);
          return;
        }
        console.log("horreeee!");
        res.redirect("/tutorial");
      }
    );
  }
};
