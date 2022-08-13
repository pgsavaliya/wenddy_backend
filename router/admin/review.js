const reviewController = require("../../controller/admin/review");

const { Router } = require("express");
const { verifyAdminToken } = require("../../middleware/verifyToken");
const reviewRoute = Router();

reviewRoute.get("/", (req, res) => {
    res.send({ status: 200, message: "review route is working" });
});

// reviewRoute.post("/add", reviewController.add);
reviewRoute.put("/update/:_id", reviewController.update);
reviewRoute.get("/getAll", reviewController.getAll);
reviewRoute.get("/byId/:_id", reviewController.byId);
reviewRoute.delete("/delete/:_id", reviewController.delete);

module.exports = reviewRoute;
