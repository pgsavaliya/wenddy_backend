const { Router } = require("express");
const addtocartcontroller = require("../../controller/user/cart");

const cartRoute = Router();

cartRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "cart route is working" });
});

cartRoute.post("/addtocart", addtocartcontroller.addtocart);
cartRoute.get("/getcart", addtocartcontroller.getcart);
cartRoute.put("/update/:_id", addtocartcontroller.update);

module.exports = cartRoute;
