const mysql = require("mysql");

module.exports = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aezakmi",
  database: "maya2",
});
