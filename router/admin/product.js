const productController = require("../../controller/admin/product");

const { Router } = require("express");
const productRoute = Router();

productRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "product route is working" });
});

productRoute.post("/add", productController.add);
productRoute.put("/update/:_id", productController.update);
productRoute.put("/updatestatus/:_id", productController.updatestatus);
productRoute.put("/updateisfav/:_id", productController.updateisfav);
productRoute.get("/getAll", productController.getAll);
productRoute.get("/byId/:_id", productController.byId);
productRoute.delete("/delete/:_id", productController.delete);
// productRoute.get("/exportData", productController.exportData);

module.exports = productRoute;
