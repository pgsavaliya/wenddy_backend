const { Router } = require("express");
const userRoute = Router();

const { verifyUserToken } = require("../../middleware/verifyToken");

const authRoute = require("./auth");
const productRoute = require("./product");
const cartRoute = require("./cart");
const orderRoute = require("./order");
const wishlistRoute = require("./wishlist");
const reviewRoute = require("./review");
const profileRoute = require("./profile");
const addressRoute = require("./address");
const countryRoute = require("./country");
const subscribeRoute = require("./subscribe");
const supportRoute = require("./support");

userRoute.get("/", (req, res) => {
  res.status(200).json({ message: "user route is working" });
});

userRoute.use("/auth", authRoute);
userRoute.use("/product", productRoute);
userRoute.use("/cart", verifyUserToken, cartRoute);
userRoute.use("/order", verifyUserToken, orderRoute);
userRoute.use("/wishlist", verifyUserToken, wishlistRoute);
userRoute.use("/review", reviewRoute);
userRoute.use("/profile", verifyUserToken, profileRoute);
userRoute.use("/address", verifyUserToken, addressRoute);
userRoute.use("/country", countryRoute);
userRoute.use("/support", supportRoute);

module.exports = userRoute;
