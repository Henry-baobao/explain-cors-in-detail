const express = require("express");
const cors = require("cors");

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

const app = express();
//没有cors header
app.get("/list/menu/no-cors", (req, res) => {
  res.json(menus);
});
//配置cors header
// app.get("/list/menu/no-cors", cors(), (req, res) => {
//   res.json(menus);
// });

//jsonp
app.get("/menu/:id", (req, res) => {
  const id = req.params.id;
  //1
  // res.end(`const data = ${JSON.stringify(menus.data[id - 1])}`);

  //2
  // res.end(`printData(${JSON.stringify(menus.data[id - 1])})`);

  //3
  // const callback = req.query.callback;
  // res.end(`${callback}(${JSON.stringify(menus.data[id - 1])})`);

  //4
    res.jsonp(menus.data[id - 1]);
});

app.get("/list/menu", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(menus);
});

app.listen(5002);
console.log("app running at port 5002");
