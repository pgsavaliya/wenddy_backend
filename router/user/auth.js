const authController = require("../../controller/user/auth");
const { userEmailCheck } = require("../../middleware/validation");
const { verifyforgotToken } = require("../../middleware/verifyToken");

const { Router } = require("express");
const authRoute = Router();

authRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "auth route is working!!" });
});

authRoute.post("/register", userEmailCheck, authController.register);
authRoute.post("/login", authController.login);
authRoute.get("/forgotPass", authController.forgot);
authRoute.post("/changepass", verifyforgotToken, authController.changepss);

module.exports = authRoute;
