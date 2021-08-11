const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();
app.use(cookieParser());

const VALID_ORIGIN = "http://localhost:3000";

const menus = {
  data: [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Region",
      path: "/region",
    },
    {
      id: 3,
      name: "IOT",
      path: "/iot",
    },
  ],
};

app.post("/menu/simple", urlencodedParser, (req, res) => {
  const body = req.body;
  console.log("simple request body: ", body);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify(body));
});

app.post("/menu/complex", jsonParser, (req, res) => {
  const body = req.body;
  console.log("complex request body: ", body);
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify(body));
});
// app.options("/menu/complex", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
// //   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.end();
// });

app.delete("/menu/delete", jsonParser, (req, res) => {
  console.log("delete body: ", req.body);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send("delete success");
});
app.options("/menu/delete", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-app-version");
  res.setHeader("Access-Control-Allow-Methods", "DELETE");
  res.end();
});

app.delete("/menu/cookie", jsonParser, (req, res) => {
  console.log("cookie request: ", req.body, req.cookies);
  res.setHeader("Access-Control-Allow-Origin", VALID_ORIGIN);
  res.setHeader("Access-Control-Allow-Credentials", true);
  //   res.setHeader("Set-Cookie", "Backend=Express");
  res.send(JSON.stringify(req.body));
});
app.options("/menu/cookie", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", VALID_ORIGIN);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-app-version");
  res.setHeader("Access-Control-Allow-Methods", "DELETE");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.end();
});

app.delete("/header", jsonParser, (req, res) => {
  console.log("cookie request: ", req.body);
  res.setHeader("Access-Control-Allow-Origin", VALID_ORIGIN);
  res.setHeader("X-Service-Version", "2.0");
  res.setHeader("Access-Control-Expose-Headers", "x-service-version");
  res.send(JSON.stringify(req.body));
});
app.options("/header", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", VALID_ORIGIN);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-app-version");
  res.setHeader("Access-Control-Allow-Methods", "DELETE");
  console.log('options header')
  res.end();
});

app.delete("/cache", jsonParser, (req, res) => {
  console.log("cookie request: ", req.body);
  res.setHeader("Access-Control-Allow-Origin", VALID_ORIGIN);
  res.setHeader("X-Service-Version", "2.0");
  res.setHeader("Access-Control-Expose-Headers", "x-service-version");
  res.send(JSON.stringify(req.body));
});
app.options("/cache", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", VALID_ORIGIN);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-app-version");
  res.setHeader("Access-Control-Allow-Methods", "DELETE");
  res.setHeader("Access-Control-Max-Age", 60);
  console.log('options cache')
  res.end();
});

app.listen(5003, () => {
  console.log("app running at port 5003");
});
