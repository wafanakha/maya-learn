const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aezakmi",
  database: "maya",
});

db.connect((err) => {
  if (err) {
    console.log("Tidak bisa konek ke DB" + err.stack);
    return;
  }
  console.log("Terhubung ke database dengan ID " + db.threadId);
});

exports.db = db;
