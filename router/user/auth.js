const authController = require("../../controller/user/auth");
const { userEmailCheck } = require("../../middleware/validation");

const { Router } = require("express");
const authRoute = Router();

authRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "auth route is working!!" });
});

authRoute.post("/register", userEmailCheck, authController.register);
authRoute.post("/login", authController.login);
authRoute.get("/forgotPass", authController.forgot);
authRoute.post("/changepass", authController.changepss);

module.exports = authRoute;
