const express = require("express");
const app = express();
const mongoose = require("mongoose");
const json2xls = require("json2xls");
const cors = require("cors");
const path = require("path");
const v1 = require("./router/v1");
// const cron = require("node-cron");
require("dotenv").config({ path: path.join(__dirname, "./config/.env") });
const cron = require("./currency");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(json2xls.middleware);
// app.set("helper engine", "hbs");

// app.use(express.static("public"));
// app.use(express.static(__dirname + "/public"));

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Initial Route for wendy-backend!!" });
});
// cron.schedule("*/5 * * * * *", async () => {
//   console.log("cron running");
// let getData = await countryModel.find();
// if (getData) {
//   console.log(getData);
// }
// else{

// }
// });
app.use("/v1", v1);

mongoose.connect(process.env.MONGODB_URL, async (err, result) => {
  if (err) {
    console.log("Mongodb Connection Error : ", err);
  } else {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server Started At : ", process.env.PORT || 5000);
    });
  }
});

cron();

