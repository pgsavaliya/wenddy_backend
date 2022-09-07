const { Router } = require("express");
const ordercontroller = require("../../controller/user/address");
const orderRoute = Router();

orderRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "order route is working" });
});

orderRoute.post("/add", ordercontroller.add);
orderRoute.put("/addMultiAddress/:_id", ordercontroller.addMultiAddress);
orderRoute.put("/update/:address_id", ordercontroller.update);
orderRoute.put("/deleteOne/:address_id", ordercontroller.deleteOne);
// orderRoute.put("/primary/:address_id", ordercontroller.primaryUpdate);
orderRoute.get("/getAll", ordercontroller.getAll);
orderRoute.delete("/delete/:_id", ordercontroller.delete);

module.exports = orderRoute;
