const { Router } = require("express");
const userRoute = Router();
const { verifyUserToken } = require("../../middleware/verifyToken");

const authRoute = require("./auth");
const productRoute = require("./product");

userRoute.get("/", (req, res) => {
  res.status(200).json({ message: "user route is working" });
});

userRoute.use("/auth", authRoute);
userRoute.use("/product", productRoute);

module.exports = userRoute;
