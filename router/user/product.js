const productController = require("../../controller/user/product");

const { Router } = require("express");
const { optionalUserToken } = require("../../middleware/verifyToken");
const productRoute = Router();

productRoute.get("/", (req, res) => {
    res.send({ status: 200, message: "product route is working" });
});

// productRoute.get("/getAll",optionalUserToken ,productController.getAll);
// productRoute.get("/byId/:_id",optionalUserToken ,productController.byId);
// productRoute.get("/:urlName",optionalUserToken ,productController.getByName);


module.exports = productRoute;