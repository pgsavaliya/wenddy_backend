const { Router } = require("express");
const ordercontroller = require("../../controller/user/order");
const orderRoute = Router();

orderRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "order route is working" });
});

orderRoute.post("/order", ordercontroller.order);
orderRoute.get("/byId", ordercontroller.byId);
orderRoute.get("/paymant", ordercontroller.payment);
orderRoute.get("/getorder", ordercontroller.getorder);
orderRoute.put("/cancel_order", ordercontroller.cancel);

module.exports = orderRoute;
