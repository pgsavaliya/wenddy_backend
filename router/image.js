const imageController = require("../controller/image");
const { Router } = require("express");
const imageRouter = Router();
const { upload } = require("../middleware/upload");
const formidable = require("formidable");

imageRouter.get("/", (req, res) => {
  res.status(200).json({ message: "image route is working" });
});

imageRouter.post(
  "/upload",
  (req, res, next) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      req.files = files;
      next();
      // res.json({ fields, files });
    });
  },
  imageController.upload
);
imageRouter.delete("/delete", imageController.delete);

module.exports = imageRouter;
// upload.single("multi-files"),
