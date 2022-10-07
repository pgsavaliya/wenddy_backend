const supportController = require("../../controller/user/support");

const { Router } = require("express");
const supportRoute = Router();

supportRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "support route is working!!" });
});

supportRoute.post("/",supportController.addSupport);

module.exports = supportRoute;
