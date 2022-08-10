const productController = require("../../controller/user/product");

const { Router } = require("express");

const productRoute = Router();

productRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "product route is working" });
});

productRoute.get("/getAll", productController.getAll);
productRoute.get("/byId/:_id", productController.byId);

module.exports = productRoute;
