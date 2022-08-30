const { Router } = require("express");
const subscribecontroller = require("../../controller/user/subscribe");
const { userEmailCheck } = require("../../middleware/validation");

const subscribeRoute = Router();

subscribeRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "subscribe route is working" });
});

subscribeRoute.post("/add",subscribecontroller.addsubscribe);

module.exports = subscribeRoute;
