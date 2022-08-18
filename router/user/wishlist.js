const { Router } = require("express");
const wishlistcontroller = require("../../controller/user/wishlist");

const wishlistRoute = Router();

wishlistRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "cart route is working" });
});

wishlistRoute.post("/addwishlist", wishlistcontroller.addwishlist);
wishlistRoute.get("/getwishlist", wishlistcontroller.getwishlist);
// wishlistRoute.put("/update", wishlistcontroller.update);
wishlistRoute.delete("/delete", wishlistcontroller.delete);

module.exports = wishlistRoute;
