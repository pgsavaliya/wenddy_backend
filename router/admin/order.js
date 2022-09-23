const { Router } = require("express");
const ordercontroller = require("../../controller/admin/order");
const orderRoute = Router();

orderRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "order route is working" });
});

orderRoute.get("/getorder", ordercontroller.getorder);
orderRoute.get("/byId", ordercontroller.byId);
orderRoute.put("/update", ordercontroller.update);
orderRoute.get("/getcancelorder", ordercontroller.getcancelorder);

module.exports = orderRoute;
