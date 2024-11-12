const express = require("express");
const app = express();

app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login.html");
});

app.listen(3000);
