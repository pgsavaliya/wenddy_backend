const { Router } = require("express");
const shippingcontroller = require("../../controller/admin/shipping");

const shippingRoute = Router();

shippingRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "shipping Route is working" });
});

shippingRoute.post("/addShpping", shippingcontroller.addshipping);
shippingRoute.delete("/delete/:_id", shippingcontroller.delete);

module.exports = shippingRoute;
