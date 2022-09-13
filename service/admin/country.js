const mongoose = require("mongoose");
const countryModel = require("../../model/country.model");
const countrybackupModel = require("../../model/countrybackup.model");

module.exports = {
  // addcountry: (data) => {
  //   return new Promise(async (res, rej) => {
  //     try {
  //       let getData1 = await countryModel.findOne({
  //         name: data.name,
  //         currency: data.currency,
  //       });
  //       if (getData1) {
  //         let getData = await countryModel.updateOne(
  //           {
  //             name: data.name,
  //             currency: data.currency,
  //           },
  //           data,
  //           {
  //             new: true,
  //           }
  //         );
  //         if (getData) {
  //           if (data.price) {
  //             let d = new Date();
  //             let month = d.getMonth() + 1;
  //             let date = d.getDate();
  //             let year = d.getFullYear();
  //             let curDate = year + "-" + month + "-" + date;
  //             console.log("data", curDate);
  //             let Data = await countrybackupModel.findOne({ date: curDate });
  //             if (Data) {
  //               let Data1 = await countrybackupModel.updateOne(
  //                 { date: curDate },
  //                 { $push: { country_data: data } },
  //                 { new: true }
  //               );
  //               if (Data1) {
  //                 res({ status: 200, data: "Data Updated Sucessfully!!" });
  //               } else {
  //                 rej({ status: 404, message: "Invalid id!!" });
  //               }
  //             } else {
  //               let backup = {};
  //               backup.date = curDate;
  //               backup.country_data = data;
  //               let newcountrybackupModel = new countrybackupModel(backup);
  //               let Data1 = await newcountrybackupModel.save();
  //               if (Data1) {
  //                 res({ status: 200, data: "Data Inserted Sucessfully!!" });
  //               } else {
  //                 rej({ status: 404, message: "Invalid id!!" });
  //               }
  //             }
  //           } else {
  //             res({ status: 200, data: "Data Updated Sucessfully!!" });
  //           }
  //         }
  //       } else {
  //         let newcountryModel = new countryModel(data);
  //         let saveData = await newcountryModel.save();
  //         if (saveData) {
  //           res({ status: 200, data: "Added to Country Successfully!!" });
  //         } else {
  //           rej({ status: 404, message: "something went wrong!!" });
  //         }
  //       }
  //     } catch (err) {
  //       console.log("err ...", err);
  //       rej({
  //         status: err?.status || 500,
  //         error: err,
  //         message: err?.message || "Something Went Wrong!!!",
  //       });
  //     }
  //   });
  // },

  addcountry: (data) => {
    return new Promise(async (res, rej) => {
      try {
        // let existData = await countryModel.find({ serviceId: data.serviceId, countryId: data.countryId });
        // if (existData.length > 0) {
        //   let findData = await countryModel.deleteMany({ serviceId: data.serviceId, countryId: data.countryId });
        // }
        console.log("data", data);
        let i;
        let savedata;
        for (i = 0; i < data.countryData.length; i++) {
          let obj = {
            name: data.countryData[i].name,
            currency: data.countryData[i].currency,
            image: data.countryData[i].image,
            symbol: data.countryData[i].symbol,
          };
          let existData = await countryModel.find({
            name: obj.name,
            currency: obj.currency,
          });
          console.log("exist Data", existData);
          if (existData.length > 0) {
            let findData = await countryModel.deleteMany({
              name: obj.name,
              currency: obj.currency,
            });
          }
          let newCountryModel = new countryModel(obj);
          savedata = await newCountryModel.save();
        }
        if (i == data.countryData.length) {
          res({ status: 200, data: "Data Saved Successfully!!" });
        } else {
          rej({ status: 404, message: "something went wrong!!" });
        }
      } catch (err) {
        console.log("err ...", err);
        rej({
          status: err?.status || 500,
          error: err,
          message: err?.message || "Something Went Wrong!!!",
        });
      }
    });
  },

  deletecountry: (data) => {
    return new Promise(async (res, rej) => {
      try {
        let deleteData = await countryModel.deleteOne({
          name: data.name,
        });
        if (deleteData) {
          res({ status: 200, data: "Data Deleted!!" });
        } else {
          rej({ status: 404, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log("err ...", err);
        rej({
          status: err?.status || 500,
          error: err,
          message: err?.message || "Something Went Wrong!!!",
        });
      }
    });
  },

  getcountry: () => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await countryModel.find();
        if (getData) {
          res({ status: 200, data: getData });
        } else {
          rej({ status: 404, message: "Data Not Found!!" });
        }
      } catch (err) {
        console.log("err ...", err);
        rej({
          status: err?.status || 500,
          error: err,
          message: err?.message || "Something Went Wrong!!!",
        });
      }
    });
  },
};
