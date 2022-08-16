const usermanageController = require("../../controller/admin/usermanage");

const { Router } = require("express");
const usermanageRoute = Router();

usermanageRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "product route is working" });
});

usermanageRoute.put("/update/:_id", usermanageController.update);
usermanageRoute.get("/getAll", usermanageController.getAll);
usermanageRoute.get("/byId/:_id", usermanageController.byId);
usermanageRoute.delete("/delete/:_id", usermanageController.delete);

module.exports = usermanageRoute;
