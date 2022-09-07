const { Router } = require("express");
const subscribecontroller = require("../../controller/admin/subscribe");

const subscribeRoute = Router();

subscribeRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "subscribe Route is working" });
});

subscribeRoute.get("/get", subscribecontroller.getsubscribe);

module.exports = subscribeRoute;
