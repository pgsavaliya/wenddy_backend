const { Router } = require("express");
const adminRoute = Router();
const { verifyAdminToken } = require("../../middleware/verifyToken");

const authRoute = require("./auth");
const productRoute = require("./product");
const reviewRoute = require("./review");
const usermanageRoute = require("./usermanage");

adminRoute.get("/", (req, res) => {
  res.status(200).json({ message: "admin Route is working" });
});

adminRoute.use("/auth", authRoute);
adminRoute.use("/product", verifyAdminToken, productRoute);
adminRoute.use("/review", verifyAdminToken, reviewRoute);
adminRoute.use("/usermanage", verifyAdminToken, usermanageRoute);

module.exports = adminRoute;
