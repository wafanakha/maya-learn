const database = require("../../database/mysql.js");
const nodeMailer = require("nodemailer");
const crypto = require("crypto");

module.exports = (req, res) => {
  const email = req.body.email;
  database.query("SELECT * FROM user WHERE email = ?", [email], (err, user) => {
    if (err) {
      console.log(err.stack);
      return;
    }
    user = user[0];
    console.log(user);
    if (user != undefined) {
      const token = crypto.randomBytes(20).toString("hex");
      database.query(
        "UPDATE user SET token = ? WHERE email = ?",
        [token, email],
        (err) => {
          if (err) {
            console.log(err.stack);
            return;
          }
          console.log("token success");
        }
      );
      const transporter = nodeMailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
          user: "wafanakha15@gmail.com",
          pass: "rzoe bdvz rbch mima",
        },
      });
      const mailOptions = {
        from: "wafanakha15@gmail.com",
        to: email,
        subject: "Reset Password",
        text: `Berikut adalah link untuk mereset password http://localhost:5000/reset/${token}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send("Tidak bisa mengirim Email");
        } else {
          console.log(`Email sent: ${info.response}`);
          res.status(200).send("lihat Email anda");
        }
      });
    } else {
      res.status(404).send("email tidak ditemukan");
    }
  });
};
