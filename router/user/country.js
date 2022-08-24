const { Router } = require("express");
const countrycontroller = require("../../controller/user/country");

const countryRoute = Router();

countryRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "country Route is working" });
});

countryRoute.get("/getcountry", countrycontroller.getcountry);

module.exports = countryRoute;
