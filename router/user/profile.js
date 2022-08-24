const { Router } = require("express");
const profilecontroller = require("../../controller/user/profile");
const profileRoute = Router();

profileRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "profile route is working" });
});

profileRoute.get("/getprofile", profilecontroller.getprofile);
profileRoute.put("/update/:_id", profilecontroller.update);
profileRoute.post("/resetpassword", profilecontroller.resetpss);
// profileRoute.delete("/delete/:_id", profilecontroller.delete);

module.exports = profileRoute;
