const { authenticate } = require("passport");
const bcrypt = require("bcrypt");
const Local = require("passport-local").Strategy;
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

function initialize(passport, getuserbyEmail, getUserbyId) {
  const autentikasiUser = (email, password, done) => {
    db.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      async (err, user) => {
        if (err) {
          console.log(err.stack);
          return;
        }
        user = user[0];
        if (user == undefined) {
          return done(null, false, { message: "Tidak ada user dengan email" });
        }
        console.log(user);

        try {
          if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password salah" });
          }
        } catch (e) {
          return done(e);
        }
      }
    );
  };
  passport.use(new Local({ usernameField: "email" }, autentikasiUser));
  passport.serializeUser((user, done) => done(null, user.user_id));
  passport.deserializeUser((id, done) => {
    return done(
      null,
      db.query("SELECT * FROM user WHERE user_id = ?", [id], (err, user) => {
        if (err) {
          console.log(err);
          return;
        }
        return user[0];
      })
    );
  });
}
module.exports = initialize;
