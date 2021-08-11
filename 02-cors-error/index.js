const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

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

app.use("/images", express.static(__dirname + "/images"));
app.use("/scripts", express.static(__dirname + "/scripts"));

app.get("/list/menus", (req, res) => {
  res.send(JSON.stringify(menus));
});

app.post("/menu", urlencodedParser, (req, res) => {
  const { id } = req.body;
  console.log("request body: ", req.body, id);
  //delete menu
  res.send("request handled");
  console.log("response finished");
});

app.listen(5001);
console.log("app running on port 5001");
