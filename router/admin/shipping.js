const { Router } = require("express");
const shippingcontroller = require("../../controller/admin/shipping");

const shippingRoute = Router();

shippingRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "shipping Route is working" });
});

shippingRoute.post("/addShipping", shippingcontroller.addshipping);
shippingRoute.delete("/delete/:_id", shippingcontroller.delete);
shippingRoute.get("/getShipping", shippingcontroller.getshipping);
shippingRoute.put("/updateShipping", shippingcontroller.update);
module.exports = shippingRoute;
