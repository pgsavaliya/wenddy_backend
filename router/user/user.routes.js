const { Router } = require("express");
const userRoute = Router();

const { verifyUserToken } = require("../../middleware/verifyToken");

const authRoute = require("./auth");
const productRoute = require("./product");
const cartRoute = require("./cart");
const reviewRoute = require("./review");
const profileRoute = require("./profile");
const wishlistRoute = require("./wishlist");

userRoute.get("/", (req, res) => {
  res.status(200).json({ message: "user route is working" });
});

userRoute.use("/auth", authRoute);
userRoute.use("/product", productRoute);
userRoute.use("/cart", verifyUserToken, cartRoute);
userRoute.use("/wishlist", verifyUserToken, wishlistRoute);
userRoute.use("/review", verifyUserToken, reviewRoute);
userRoute.use("/profile", verifyUserToken, profileRoute);
module.exports = userRoute;
