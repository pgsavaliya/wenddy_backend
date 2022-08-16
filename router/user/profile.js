const { Router } = require("express");
const otpcontroller = require("../../controller/otp");
const profilecontroller = require("../../controller/user/profile");
const profileRoute = Router();

profileRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "profile route is working" });
});

profileRoute.get("/getprofile", profilecontroller.getprofile);
profileRoute.put("/update/:_id", profilecontroller.update);
profileRoute.delete("/delete/:_id", profilecontroller.delete);
profileRoute.post("/resetpassword", profilecontroller.resetpss);
profileRoute.get("/sendOtp", otpcontroller.sendOtp);

module.exports = profileRoute;
