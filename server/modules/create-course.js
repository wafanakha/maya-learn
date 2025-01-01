const database = require("../../database/mysql.js");

module.exports = (req, res) => {
  const { judul, type, durasi, ringkasan, stepTitle, stepText } = req.body;

  const { tumbnailImg, stepImg } = req.files;
  console.log(tumbnailImg[0].filename);
  console.log(stepImg);
  database.query(
    "INSERT INTO tutorial(judul, tipe, durasi, isi_course, tumb_image, user_id) VALUES (?,?,?,?,?,?)",
    [judul, type, durasi, ringkasan, tumbnailImg[0].filename, req.user.user_id],
    (err) => {
      if (err) {
        console.log(err.stack);
        return;
      }
    }
  );
  for (let i = 0; i < stepTitle.length; i++) {
    if (stepImg[i].originalname != "myFile.txt") {
      database.query(
        "INSERT INTO step SET judul_step = ?, isi_table = ?, image = ?, lesson_id = (SELECT lesson_id FROM tutorial WHERE judul = ?)",
        [stepTitle[i], stepText[i], stepImg[i].filename, judul],
        (err) => {
          if (err) {
            console.log(err.stack);
            return;
          }
          console.log("horreeee!");
        }
      );
    } else {
      database.query(
        "INSERT INTO step SET judul_step = ?, isi_table = ?, lesson_id = (SELECT lesson_id FROM tutorial WHERE judul = ?)",
        [stepTitle[i], stepText[i], judul],
        (err) => {
          if (err) {
            console.log(err.stack);
            return;
          }
          console.log("horreeee!");
        }
      );
    }
  }
  res.redirect("/dashboard");
};
