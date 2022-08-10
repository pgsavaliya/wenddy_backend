const productController = require("../../controller/user/product");

const { Router } = require("express");
const {
  optionalUserToken,
  verifyUserToken,
} = require("../../middleware/verifyToken");
const addtocartcontroller = require("../../controller/user/addtocart");

const productRoute = Router();

productRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "product route is working" });
});

productRoute.get("/getAll", verifyUserToken, productController.getAll);
productRoute.get("/byId/:_id", verifyUserToken, productController.byId);
productRoute.post("/addtocart", verifyUserToken, addtocartcontroller.addtocart);
// productRoute.post("/viewcart", verifyUserToken, addtocartcontroller.addtocart);

// productRoute.get("/:urlName", verifyUserToken, productController.getByName);

module.exports = productRoute;
