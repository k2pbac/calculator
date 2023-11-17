const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  console.log(req);
  let num1 = req.body["num1"];
  let num2 = req.body["num2"];
  res.send("result is " + (parseInt(num1) + parseInt(num2)));
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
