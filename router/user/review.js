const { Router } = require("express");
const reviewcontroller = require("../../controller/user/review");
const { verifyUserToken } = require("../../middleware/verifyToken");

const reviewRoute = Router();

reviewRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "review route is working" });
});

reviewRoute.post("/addreview", verifyUserToken, reviewcontroller.addreview);
reviewRoute.get("/getreview/:product_id", reviewcontroller.getreview);
reviewRoute.get("/getAll", reviewcontroller.getAll);
// cartRoute.put("/update/:_id", addtocartcontroller.update);
// cartRoute.delete("/delete/:_id", addtocartcontroller.delete);

module.exports = reviewRoute;
