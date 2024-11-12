const { authenticate } = require("passport");
const bcrypt = require("bcrypt");
const Local = require("passport-local").Strategy;

function initialize(passport, getuserbyEmail, getUserbyId) {
  const autentikasiUser = async (email, password, done) => {
    const user = getuserbyEmail(email);
    if (user == null) {
      return done(null, false, { massage: "Tidak ada user dengan email" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { massage: "Password salah" });
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use(new Local({ usernameField: "email" }, autentikasiUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserbyId(id));
  });
}
module.exports = initialize;
