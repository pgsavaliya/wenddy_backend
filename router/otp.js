const otpController = require("../controller/otp");

const { Router } = require("express");
const otpRouter = Router();

otpRouter.get("/", (req, res) => {
    res.status(200).json({ message: "otp route is working" });
});

otpRouter.get("/sendOtp", otpController.sendOtp);
otpRouter.get("/verifyOtp", otpController.verifyOtp);

module.exports = otpRouter;