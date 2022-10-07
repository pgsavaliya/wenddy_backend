const { Router } = require("express");
const adminRoute = Router();
const { verifyAdminToken } = require("../../middleware/verifyToken");

const authRoute = require("./auth");
const productRoute = require("./product");
const reviewRoute = require("./review");
const usermanageRoute = require("./usermanage");
const dashBoardRoute = require("./dashboard");
const countryRoute = require("./country");
const subscribeRoute = require("./subscribe");
const shippingRoute = require("./shipping");
const orderRoute = require("./order");
const supportRoute = require("./support");

adminRoute.get("/", (req, res) => {
  res.status(200).json({ message: "admin Route is working" });
});

adminRoute.use("/auth", authRoute);
adminRoute.use("/product", verifyAdminToken, productRoute);
adminRoute.use("/review", verifyAdminToken, reviewRoute);
adminRoute.use("/usermanage", verifyAdminToken, usermanageRoute);
adminRoute.use("/dashBoard", verifyAdminToken, dashBoardRoute);
adminRoute.use("/country", verifyAdminToken, countryRoute);
adminRoute.use("/subscribe", verifyAdminToken, subscribeRoute);
adminRoute.use("/shipping", verifyAdminToken, shippingRoute);
adminRoute.use("/order", verifyAdminToken, orderRoute);
adminRoute.use("/support", supportRoute);

module.exports = adminRoute;
