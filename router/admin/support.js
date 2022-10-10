const { Router } = require("express");
const supportcontroller = require("../../controller/admin/support");

const supportRoute = Router();

supportRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "support Route is working" });
});

supportRoute.get("/getSupport", supportcontroller.getSupport);

module.exports = supportRoute;
