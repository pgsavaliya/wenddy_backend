const { Router } = require("express");
const profilecontroller = require("../../controller/user/profile");

const profileRoute = Router();

profileRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "profile route is working" });
});

profileRoute.get("/getprofile", profilecontroller.getprofile);
// cartRoute.put("/update/:_id", addtocartcontroller.update);
// cartRoute.delete("/delete/:_id", addtocartcontroller.delete);

module.exports = profileRoute;
