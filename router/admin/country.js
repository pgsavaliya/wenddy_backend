const { Router } = require("express");
const countrycontroller = require("../../controller/admin/country");

const countryRoute = Router();

countryRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "country Route is working" });
});

countryRoute.post("/addcountry", countrycontroller.addcountry);
countryRoute.delete("/deletecountry", countrycontroller.deletecountry);

countryRoute.get("/getcountry", countrycontroller.getcountry);

module.exports = countryRoute;
