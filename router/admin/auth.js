const authController = require("../../controller/admin/auth");
const { adminEmailCheck } = require("../../middleware/validation");

const { Router } = require("express");
const authRoute = Router();

authRoute.get("/", (req, res) => {
    res.send({ status: 200, message: "auth route is working!!" });
});

authRoute.post("/register", adminEmailCheck, authController.register);
authRoute.post("/login", authController.login);

module.exports = authRoute;