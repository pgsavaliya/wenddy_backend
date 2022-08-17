const imageController = require("../controller/image");
const { Router } = require("express");
const imageRouter = Router();
const { upload } = require("../middleware/upload");


imageRouter.get("/", (req, res) => {
    res.status(200).json({ message: "image route is working" });
});

imageRouter.post("/upload", upload.array("multi-files"), imageController.upload);
imageRouter.delete("/delete", imageController.delete);

module.exports = imageRouter;