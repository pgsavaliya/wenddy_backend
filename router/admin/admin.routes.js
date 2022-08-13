const { Router } = require("express");
const adminRoute = Router();
const { verifyAdminToken } = require("../../middleware/verifyToken");

const authRoute = require("./auth");
const productRoute = require("./product");
const reviewRoute = require("./review");

adminRoute.get("/", (req, res) => {
  res.status(200).json({ message: "admin Route is working" });
});

adminRoute.use("/auth", authRoute);
adminRoute.use("/product", verifyAdminToken, productRoute);
adminRoute.use("/review", verifyAdminToken, reviewRoute);

module.exports = adminRoute;
