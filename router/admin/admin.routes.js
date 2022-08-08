const { Router } = require("express");
const adminRoute = Router();

const authRoute = require("./auth");
const productRoute = require("./product");

adminRoute.get("/", (req, res) => {
  res.status(200).json({ message: "admin Route is working" });
});

adminRoute.use("/auth", authRoute);
adminRoute.use("/product", productRoute);

module.exports = adminRoute;
