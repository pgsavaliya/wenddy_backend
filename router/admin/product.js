const productController = require("../../controller/admin/product");

const { Router } = require("express");
const { verifyAdminToken } = require("../../middleware/verifyToken");
const productRoute = Router();

productRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "product route is working" });
});

productRoute.post("/add", verifyAdminToken, productController.add);
productRoute.put("/update/:_id", verifyAdminToken, productController.update);
productRoute.get("/getAll", verifyAdminToken, productController.getAll);
productRoute.get("/byadminId", verifyAdminToken, productController.byId);
productRoute.delete("/delete/:_id", verifyAdminToken, productController.delete);
// productRoute.get("/exportData", productController.exportData);

module.exports = productRoute;
