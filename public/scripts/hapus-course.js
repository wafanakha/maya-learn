const btn = document.getElementById("hapus-course");
const database = require("../../database/mysql.js");

btn.addEventListener(onclick, () => {
  console.log("wahooooo");
});

const hapusCourse = (course_id) => {
  database.query("DELETE FROM step WHERE lesson_id=?", [course_id], (err) => {
    if (err) {
      console.log(err.stack);
    }
    database.query(
      "DELETE FROM tutorial WHERE lesson_id=?",
      [course_id],
      (err) => {
        if (err) {
          console.log(err.stack);
        }
        alert("Tutorial sudah dihapus");
      }
    );
  });
};
