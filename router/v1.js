const { Router } = require("express");
const v1 = Router();

const adminRoute = require("./admin/admin.routes");
const userRoute = require("./user/user.routes");
const imageRoute = require("./image");
const otpRoute = require("./otp");

v1.get("/", (req, res) => {
  res.status(200).json({ message: "v1 routes working!!" });
});

v1.use("/admin", adminRoute);
v1.use("/user", userRoute);
v1.use("/image", imageRoute);
v1.use("/otp", otpRoute);

module.exports = v1;
