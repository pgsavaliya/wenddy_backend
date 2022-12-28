const firebaseAdmin = require("firebase-admin");
const {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
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

// const { uploadImage, deletedImage } = require("../helper/imageize");
// const fs = require("fs/promises");

module.exports = {
  upload: async (image) => {
    return new Promise(async (res, rej) => {
      try {
        console.log("Pavan");
        //firebase logic to upload the image
        let i;
        let media = [];
        // const storage = getStorage();
        // console.log("here storage");
        // console.log("--------------------------..", image.multi.filepath);
        // console.log("--------------------------..", image.multi);
        const storageRef = ref(
          storage,
          `images/${image.multi.originalFilename}`
        );
        // const uploadTask = uploadBytesResumable(storageRef, image.multi);
        // console.log("here storageref", uploadTask);
        // uploadTask.on(
        //   "state_changed",
        //   (snapshot) => {
        //     console.log("snapshot", snapshot);
        //     // const progress = Math.round(
        //     //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //     // );
        //     // console.log("progress..", progress);
        //     // setProgresspercent(progress);
        //   },
        //   (error) => {
        //     console.log(".....error", error);
        //   },
        //   () => {
        //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //       console.log("downnn...", downloadURL);
        //     });
        //   }
        // );

        // 'file' comes from the Blob or File API
        // uploadBytes(storageRef, image)
        //   .then((snapshot) => {
        //     console.log("Uploaded a blob or file!");
        //   })
        //   .catch((err) => console.log("this is eror", err));

        // console.log("image .....", image);
        let uploaded = bucket.upload(image.multi.filepath, {
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
          // fs.unlinkSync(image.path);
          media.push({
            mediaLink: data.metadata.mediaLink,
            name: data.metadata.name,
          });
          res({
            status: 200,
            data: media,
          });

          // fs.unlink(image.origi, (err) => {
          //   if (err) console.log("someError: ", err);
          // });
        } else {
          rej({ status: 404, message: "something went wrong!!" });
        }

        res("okay");
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
