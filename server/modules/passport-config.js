const { authenticate } = require("passport");
const bcrypt = require("bcrypt");
const Local = require("passport-local").Strategy;
const database = require("../../database/mysql.js");

function initialize(passport) {
  const autentikasiUser = (email, password, done) => {
    console.log("auth");
    database.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      async (err, user) => {
        if (err) {
          console.log(err.stack);
          return;
        }
        user = user[0];
        if (user == undefined) {
          console.log("user");
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
    database.query(
      "SELECT * FROM user JOIN course_master ON course_master.user_id = user.user_id WHERE user.user_id = ?",
      [id],
      (err, user) => {
        if (err) {
          console.log(err);
          done(null);
          return;
        }
        done(null, user[0]);
      }
    );
  });
}
module.exports = initialize;
