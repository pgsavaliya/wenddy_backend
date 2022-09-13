const { Router } = require("express");
const addresscontroller = require("../../controller/user/address");
const addressRoute = Router();

addressRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "address route is working" });
});

addressRoute.post("/add", addresscontroller.add);
addressRoute.put("/addMultiAddress/:_id", addresscontroller.addMultiAddress);
addressRoute.put("/update/:address_id", addresscontroller.update);
addressRoute.put("/deleteOne/:address_id", addresscontroller.deleteOne);
// addressRoute.put("/primary/:address_id", addresscontroller.primaryUpdate);
addressRoute.get("/getAll", addresscontroller.getAll);
addressRoute.delete("/delete/:_id", addresscontroller.delete);

module.exports = addressRoute;
