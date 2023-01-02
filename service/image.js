const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage, deleteObject } = require("firebase-admin/storage");
const serviceAccount = require("../helper/wenddys-528d3-firebase-adminsdk-xzrdj-8b705f1d5b.json");
const fs = require("fs");
const e = require("express");
const path = require("path");
const { storage } = require("../helper/firebase");

initializeApp({
  credential: cert(serviceAccount),
});

const bucket = getStorage().bucket("gs://wenddys-528d3.appspot.com");

module.exports = {
  upload: async (image) => {
    return new Promise(async (res, rej) => {
      try {
        //firebase logic to upload the image
        let i;
        let media = [];

        if (!image.multi.length) {
          let uploaded = await bucket.upload(image.multi.filepath, {
            public: true,
            destination: `images/${
              Math.random() * 10000 + image.multi.originalFilename
            }`,
            metadata: {
              firebaseStorageDownloadTokens: uuidv4(),
            },
          });
          let data = await uploaded;
          data = data[0];
          if (data) {
            media.push({
              mediaLink: data.metadata.mediaLink,
              name: data.metadata.name,
            });
          }
        } else {
          for (i = 0; i < image.multi.length; i++) {
            let uploaded = await bucket.upload(image.multi[i].filepath, {
              public: true,
              destination: `images/${
                Math.random() * 10000 + image.multi[i].originalFilename
              }`,
              metadata: {
                firebaseStorageDownloadTokens: uuidv4(),
              },
            });
            let data = await uploaded;
            data = data[0];
            if (data) {
              media.push({
                mediaLink: data.metadata.mediaLink,
                name: data.metadata.name,
              });
            }

            // fs.unlink(image[i].path, (err) => {
            //   if (err) console.log("someError: ", err);
            // });
          }
        }

        if (media) {
          // fs.unlinkSync(image.path);

          res({
            status: 200,
            data: media,
          });

          // let uploaded = bucket.upload(image.multi.filepath, {
          //   public: true,
          //   destination: `images/${
          //     Math.random() * 10000 + image.multi.originalFilename
          //   }`,
          //   metadata: {
          //     firebaseStorageDownloadTokens: uuidv4(),
          //   },
          // });
          // let data = await uploaded;
          // data = data[0];
          // if (data) {
          //   media.push({
          //     mediaLink: data.metadata.mediaLink,
          //     name: data.metadata.name,
          //   });
          //   res({
          //     status: 200,
          //     data: media,
          //   });
        } else {
          rej({ status: 404, message: "something went wrong!!" });
        }

        // console.log("image from service .......", image);
        // let imageBuffer = await fs.readFile(image.path);
        // let result = await uploadImage(imageBuffer, image, image.filename, [1, 2, 3, 4]);
        // console.log("result....", result);
        // if (result) {
        //   res({
        //     status: 200,
        //     data: result,
        //   });
        // } else {
        //   rej({ status: 404, message: "something went wrong!!" });
        // }
      } catch (err) {
        console.log("error ...", err);
        rej({ status: 500, error: err });
      }
    });
  },

  delete: async (file) => {
    return new Promise(async (res, rej) => {
      try {
        const deleted = await bucket.file(file).delete();
        if (deleted) {
          res({ status: 200, data: "File Deleted Successfully!!" });
        } else {
          rej({ status: 404, error: err });
        }

        // let deleted = await deletedImage(file, [1, 2, 3, 4]);
        // console.log("deleted....", deleted);
        // if (deleted) {
        //   res({
        //     status: 200,
        //     data: deleted,
        //   });
        // } else {
        //   rej({ status: 404, message: "something went wrong!!" });
        // }
      } catch (err) {
        console.log("err...", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },
};
