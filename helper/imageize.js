// const sharp = require("sharp");
// const fs = require("fs");
// const path = require("path");
// require("dotenv").config({ path: path.join(__dirname, "../config/.env") });
// const firebaseAdmin = require("firebase-admin");
// const { v4: uuidv4 } = require("uuid");
// const { initializeApp, cert } = require("firebase-admin/app");
// const { getStorage, deleteObject } = require("firebase-admin/storage");
// const serviceAccount = require("./wenddys-528d3-firebase-adminsdk-xzrdj-8b705f1d5b.json");

// initializeApp({
//   credential: cert(serviceAccount),
// });

// const bucket = getStorage().bucket("gs://wenddys-528d3.appspot.com");



// async function uploadFileMediaLink(imageBuffer, image, filename, size) {
//   try {
//     let media = [];
//     // console.log("image .....", image);
//     let uploaded = bucket.upload(image.path, {
//       public: true,
//       destination: `images/${size}/${filename}`,
//       metadata: {
//         firebaseStorageDownloadTokens: uuidv4(),
//       },
//     });
//     let data = await uploaded;
//     data = data[0]
//     if (data) {
//       // fs.unlinkSync(image.path);
//       fs.unlink(image.path, (err) => {
//         if (err) console.log("someError: ", err)
//       })
//       media.push({
//         mediaLink: data.metadata.mediaLink,
//         name: data.metadata.name
//       })
//       return media;
//     }
//   }
//   catch (err) {
//     console.log("err .......", err);
//   }
// }

// async function uploadFile(imageBuffer, image, filename, size) {
//   try {
//     console.log("image from helper ...............", imageBuffer);
//     // console.log("path from helper ...............", path);
//     console.log("filename from helper ...............", filename);
//     console.log("size from helper ...............", size);
//     let media = [];
//     //firebase logic to upload the image
//     // let uploaded = bucket.file(path).save(), {
//     //     public: true,
//     //     destination: `images/${size}/${filename}`,
//     //     metadata: {
//     //         firebaseStorageDownloadTokens: uuidv4(),
//     //     },
//     // });

//     // let img=Buffer.from
//     console.log("fileName", filename);

//     const extensionLen = filename.split(".");
//     const extension = extensionLen[extensionLen.length - 1];

//     let uploaded = await bucket.file(`images/${size}/${filename}`).save(imageBuffer, {
//       resumable: false,
//       contentType: `imageBuffer/${extension}`,
//     });
//     // console.log("73856784582");
//     console.log("uploaded .................", uploaded);
//     // let data = await uploaded;
//     // console.log("data ..........",data);
//     // data = data[0]
//     // if (data) {
//     // return media.push({
//     //     mediaLink: data.metadata.mediaLink,
//     //     name: data.metadata.name
//     // })
//     // }}
//     return uploaded;
//   } catch (err) {
//     console.log("err form uploadFile .....", err);
//   }
//   // fs.unlink(image.path, (err) => {
//   //     if (err) console.log("someError: ", err)
//   // })
// }

// async function uploadReduceFile(file) {
//   return await sharp(file)
//     .png({ quality: 25 })
//     .toBuffer()
//     .then((outputBuffer) => {
//       return outputBuffer;
//     })
//     .catch((err) => {
//       console.log("err reduce file... .......", err);
//       return err;
//     });
// }

// // image modification
// // async function uploadReduceFile(file) {
// //     console.log("file from reduce file ............", file);
// //     return
// //     // let reduceImage= await sharp({
// //     //     create:{
// //     //         width:20,
// //     //         height:20,
// //     //         channels:4,
// //     //         background:{r: 255, g: 0, b: 0, alpha: 0.5},
// //     //     }
// //     // }).png().jpeg();
// //     // console.log("reduceImage ...........",reduceImage);
// //     // return reduceImage;
// //     .toBuffer()
// //     // .toFile(file)
// //     .then((file) => {
// //         console.log("buffer from reduce ........", file);
// //         return file;
// //     }).catch(err => {
// //         console.log("this is rror: ", err)
// //     })
// // }

// async function mediumImg(img) {
//   // console.log("file from medium file ............", img);
//   return await sharp(img)
//     .resize(600, 600, {
//       fit: "contain"
//     })
//     // .png()
//     .toBuffer()
//     .then((outputBuffer) => {
//       return outputBuffer;
//     })
//     .catch((err) => {
//       console.log("err medium file... .......", err);
//       return err;
//     });
//   // .toFile(`../upload/medium/${img.filename}`, (err, info) => {
//   //     if (err) {
//   //         return err
//   //     }
//   //     else {
//   //         console.log("buffer from small ........", info);
//   //         return info
//   //     }
//   // });
//   // .then(async img => {
//   //     console.log("buffer from medium ........", img);
//   //     return img
//   // })
//   // .catch(err => {
//   //     return err
//   // })
// }

// async function smallImg(file) {
//   // console.log("file from small file ............", file);
//   return await sharp(file)
//     .resize(178, 178, { fit: "contain" })
//     .png()
//     .toBuffer()
//     .then((outputBuffer) => {
//       return outputBuffer;
//     })
//     .catch((err) => {
//       console.log("err small file... .......", err);
//       return err;
//     });
//   // .then((err, file) => {
//   //     if (err) {
//   //         return err
//   //     }
//   //     else {
//   //         console.log("buffer from small ........", file);
//   //         return file
//   //     }
//   // })
// }

// async function uploadImage(imageBuffer, image, filename, size) {
//   let imageData = {};
//   for (const [index, siz] of size.entries()) {
//     console.log("size ........", siz);
//     switch (siz) {
//       // for original size
//       case 1: {
//         // let imageBuffer = fs.createReadStream(image.path)
//         let awsImg = await uploadFileMediaLink(
//           imageBuffer,
//           image,
//           filename,
//           "originalSize"
//         );
//         // console.log("awsImg ...........", awsImg);
//         imageData["original"] = awsImg;
//         // console.log("imageData ...........", imageData);
//         // imageData["small"] = awsImg.Key
//         // imageData["originalURL"] = awsImg.Location
//         break;
//       }
//       //for reduce size
//       case 2: {
//         // console.log("here iamge;", image)
//         // console.log(".....reduct file: ", await uploadReduceFile(image))
//         // let reducedFile = await uploadReduceFile(image);
//         // console.log("reduc...", reducedFile);
//         let awsImg = await uploadFile(
//           await uploadReduceFile(imageBuffer),
//           image,
//           filename,
//           "reduceSize"
//         );
//         // console.log("awsImg ...........", awsImg);
//         imageData["reduce"] = awsImg;
//         // console.log("imageData ...........", imageData);
//         // imageData["small"] = awsImg.Key
//         // imageData["reduceURL"] = awsImg.Location
//         break;
//       }
//       case 3: {
//         // console.log("here iamge ............", image)
//         // console.log(".....reduct file: ", await mediumImg(image))
//         let awsImg = await uploadFile(
//           await mediumImg(imageBuffer),
//           image,
//           image.filename,
//           "mediumSize"
//         );
//         // console.log("awsImg ...........", awsImg);
//         imageData["medium"] = awsImg;
//         // console.log("imageData ...........", imageData);
//         // imageData["medium"] = awsImg.Key
//         // imageData["mediumURL"] = awsImg.Location

//         break;
//       }
//       case 4: {
//         let awsImg = await uploadFile(
//           await smallImg(imageBuffer),
//           image,
//           image.filename,
//           "smallSize"
//         );
//         // console.log("awsImg ...........", awsImg);
//         imageData["small"] = awsImg;
//         // console.log("imageData ...........", imageData);
//         // imageData["small"] = awsImg.Key
//         // imageData["smallURL"] = awsImg.Location
//         break;
//       }

//       default:
//         return {
//           message: "plz enter valid size type",
//           success: false,
//           undefined,
//           status: 400,
//         };
//     }
//     // if (index === size.length - 1) {
//     //   fs.unlinkSync(image.path);
//     //   return imageData;
//     // }
//   }
//   return imageData;
// }

// async function deleteImage(file, subFile) {
//   try {
//     console.log("file ....", file);
//     console.log("subFile ....", subFile);
//     const deleteFile = await bucket.file(`images/${subFile}/${file.split("/")[2]}`).delete();
//     if (deleteFile) {
//       return "File Deleted Successfully!!";
//     }
//   }
//   catch (err) {
//     console.log("err .......", err);
//   }
// }

// async function deletedImage(image, size) {
//   let imageData = {};
//   for (const [index, siz] of size.entries()) {
//     console.log("size ........", siz);
//     switch (siz) {
//       // for original size
//       case 1: {
//         // let imageBuffer = fs.createReadStream(image.path)
//         let awsImg = await deleteImage(
//           image,
//           "originalSize"
//         );
//         // console.log("awsImg ...........", awsImg);
//         imageData["original"] = awsImg;
//         // console.log("imageData ...........", imageData);
//         // imageData["small"] = awsImg.Key
//         // imageData["originalURL"] = awsImg.Location
//         break;
//       }
//       //for reduce size
//       case 2: {
//         // console.log("here iamge;", image)
//         // console.log(".....reduct file: ", await uploadReduceFile(image))
//         // let reducedFile = await uploadReduceFile(image);
//         // console.log("reduc...", reducedFile);
//         let awsImg = await deleteImage(
//           image,
//           "reduceSize"
//         );
//         // console.log("awsImg ...........", awsImg);
//         imageData["reduce"] = awsImg;
//         // console.log("imageData ...........", imageData);
//         // imageData["small"] = awsImg.Key
//         // imageData["reduceURL"] = awsImg.Location
//         break;
//       }
//       case 3: {
//         // console.log("here iamge ............", image)
//         // console.log(".....reduct file: ", await mediumImg(image))
//         let awsImg = await deleteImage(
//           image,
//           "mediumSize"
//         );
//         // console.log("awsImg ...........", awsImg);
//         imageData["medium"] = awsImg;
//         // console.log("imageData ...........", imageData);
//         // imageData["medium"] = awsImg.Key
//         // imageData["mediumURL"] = awsImg.Location

//         break;
//       }
//       case 4: {
//         let awsImg = await deleteImage(
//           image,
//           "smallSize"
//         );
//         // console.log("awsImg ...........", awsImg);
//         imageData["small"] = awsImg;
//         // console.log("imageData ...........", imageData);
//         // imageData["small"] = awsImg.Key
//         // imageData["smallURL"] = awsImg.Location
//         break;
//       }

//       default:
//         return {
//           message: "plz enter valid size type",
//           success: false,
//           undefined,
//           status: 400,
//         };
//     }
//     // if (index === size.length - 1) {
//     //   fs.unlinkSync(image.path);
//     //   return imageData;
//     // }
//   }
//   return imageData;
// }

// module.exports = { uploadImage, deletedImage };
