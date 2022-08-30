const { Router } = require("express");
const subscribecontroller = require("../../controller/user/subscribe");

const subscribeRoute = Router();

subscribeRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "subscribe route is working" });
});

<<<<<<< HEAD
subscribeRoute.post("/add",subscribecontroller.addsubscribe);
=======
subscribeRoute.post("/addsubscribe", subscribecontroller.addsubscribe);
>>>>>>> b52afbdb440de78d8673a9ab4062d6da7a9e1672

module.exports = subscribeRoute;
