const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require('uuid');
const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage, deleteObject } = require("firebase-admin/storage");
const serviceAccount = require("../helper/wenddys-528d3-firebase-adminsdk-xzrdj-8b705f1d5b.json");
const fs = require("fs");
const e = require("express");
// const path = require("path");

initializeApp({
    credential: cert(serviceAccount),
});

const bucket = getStorage().bucket(
    "gs://wenddys-528d3.appspot.com"
);

module.exports = {
    upload: async (image) => {
        return new Promise(async (res, rej) => {
            try {
                //firebase logic to upload the image
                let i;
                let media = []
                // console.log("image .....", image);
                for (i = 0; i < image.length; i++) {
                    let uploaded = bucket.upload(image[i].path, {
                        public: true,
                        destination: `images/${Math.random() * 10000 + image[i].filename}`,
                        metadata: {
                            firebaseStorageDownloadTokens: uuidv4(),
                        },
                    });
                    let data = await uploaded;
                    data = data[0]
                    if (data) {
                        // fs.unlinkSync(image.path);
                        media.push({
                            mediaLink: data.metadata.mediaLink,
                            name: data.metadata.name
                        })
                    
                    }
                    console.log(`I is: ${i} `, image[i])
                    fs.unlink(image[i].path, (err) => {
                        if(err) console.log("someError: ",err)
                    })
                }
                res({
                    status: 200,
                    data: media
                });
            }
            catch (err) {
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
            }
            catch (err) {
                console.log("err...", err);
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        });
    },

}
