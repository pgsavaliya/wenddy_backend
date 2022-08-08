const { Router } = require("express");
const adminRoute = Router();

const authRoute = require("./auth");

adminRoute.get("/", (req, res) => {
    res.status(200).json({ message: "admin Route is working" });
});

adminRoute.use("/auth", authRoute);

module.exports = adminRoute;
