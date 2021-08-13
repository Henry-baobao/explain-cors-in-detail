const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");

const VALID_ORIGIN = "http://localhost:3000";

const app = express();
const jsonParser = bodyParser.json();

app.use(
  morgan("dev", {
    skip: (req, res) => res.statusCode < 400,
  })
);
app.use(
  morgan("combined", {
    stream: fs.createWriteStream(path.join(__dirname, "/logs/access.log"), {
      flags: "a",
    }),
  })
);

app.post("/menu/add", jsonParser, (req, res) => {
  console.log("request body: ", req.body, Date.now());
  res.send(
    JSON.stringify({
      status: "success",
      data: req.body,
    })
  );
});

app.options("/menu/add", (req, res) => {
  console.log("preflight request received, do not set cors headers");
  res.end();
});

app.listen(5005, () => {
  console.log("app running at port 5005");
});
