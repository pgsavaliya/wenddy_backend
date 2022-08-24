const dashboardController = require("../../controller/admin/dashboard");

const { Router } = require("express");
const dashBoardRoute = Router();

// dashBoardRoute.get("/", (req, res) => {
//     res.send({ status: 200, message: "dashBoard route is working!!" });
// });

dashBoardRoute.get("/", dashboardController.get);

module.exports = dashBoardRoute;