const { Router } = require("express");
const v1 = Router();

const adminRoute = require("./admin/admin.routes");
const userRoute = require("./user/user.routes");

v1.get("/", (req, res) => {
    res.status(200).json({ message: "v1 routes working!!" });
});

v1.use("/admin", adminRoute);
v1.use("/user", userRoute);

module.exports = v1;