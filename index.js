const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const superagent = require("superagent");
let cheerio = require("cheerio");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var dictt = [
  "哲",
  "科",
  "文",
  "心理",
  "政治",
  "工程",
  "计算机科",
  "化",
  "物理",
  "数",
  "经济",
  "美",
  "史",
  "生物",
  "地理",
  "建筑",
];
app.listen(1145, () => console.log("start on port 1145"));
var stat;
var ans = [];

app.get("/pred", (req, res) => {
  var id = req.query.id;
  var idd = req.query.idd;
  ans = [];
  stat = [];
  superagent
    .get("https://book.douban.com/subject/" + id + "/")
    .end((err, sres) => {
      if (err) {
        console.log(`${err}`);
        return ["nonono"];
      } else {
        ans = [];
        stat = [];
        const $ = cheerio.load(sres.text);
        x = $(".intro").children("p").text();
        var listx = x.split("学");
        for (var ax = 0; ax < listx.length; ax++) {
          for (var axx = 0; axx < 13; axx++) {
            if (listx[ax].split(dictt[axx])[1] == "") {
              ans.push(dictt[axx] + "学");
            }
          }
        }
        stat = [...new Set(ans)];
        res.json({data:stat,id:idd});
      }
    });
});
