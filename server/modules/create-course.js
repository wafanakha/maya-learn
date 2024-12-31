const database = require("../../database/mysql.js");

module.exports = (req, res) => {
  const { judul, type, durasi, ringkasan, stepTitle, stepText } = req.body;

  const { tumbnailImg, stepImg } = req.files;
  console.log(tumbnailImg);
  console.log(stepImg);
  database.query(
    "INSERT INTO tutorial(judul, tipe, durasi, isi_course, image, user_id) VALUES (?,?,?,?,?,?)",
    [judul, type, durasi, ringkasan, tumbnailImg[0].path, req.user.user_id],
    (err) => {
      if (err) {
        console.log(err.stack);
        return;
      }
    }
  );
  for (let i = 0; i < stepTitle.length; i++) {
    database.query(
      "INSERT INTO step SET judul_step = ?, isi_table = ?, image = ?, lesson_id = (SELECT lesson_id FROM tutorial WHERE judul = ?)",
      [stepTitle[i], stepText[i], stepImg[i].path, judul],
      (err) => {
        if (err) {
          console.log(err.stack);
          return;
        }
        console.log("horreeee!");
      }
    );
  }
  res.redirect("/dashboard");
};
