const { Router } = require("express");
const reviewcontroller = require("../../controller/user/review");
const { userEmailCheck } = require("../../middleware/validation");

const reviewRoute = Router();

reviewRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "review route is working" });
});

reviewRoute.post("/addreview", reviewcontroller.addreview);
reviewRoute.get("/getreview", reviewcontroller.getreview);
// cartRoute.put("/update/:_id", addtocartcontroller.update);
// cartRoute.delete("/delete/:_id", addtocartcontroller.delete);

module.exports = reviewRoute;
