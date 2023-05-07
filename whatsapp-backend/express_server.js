const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const index = require("./index");

app.get("/wa", (req, res) => {
  index.handler(req, res);
});

app.post("/wa", (req, res) => {
  index.handler(req, res);
});

app.get("/welcome_logo", function (req, res) {
  res.sendFile(__dirname + "/logo.png");
});

app.listen(port, () => {
  console.log(`Server listening on port:- ${port}`);
});
