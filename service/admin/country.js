const mongoose = require("mongoose");
const countryModel = require("../../model/country.model");
const countrybackupModel = require("../../model/countrybackup.model");

module.exports = {
  addcountry: (data) => {
    return new Promise(async (res, rej) => {
      try {
        // console.log("data ........", data);
        let getData1 = await countryModel.findOne({
          name: data.name,
          currency: data.currency,
        });
        // console.log("getData", getData1);
        if (getData1) {
          let getData = await countryModel.updateOne(
            {
              name: data.name,
              currency: data.currency,
            },
            data,
            {
              new: true,
            }
          );
          if (getData) {
            let date = new Date();
            let Data = await countrybackupModel.findOne({ date: date });
            if (Data) {
              let Data1 = await countrybackupModel.findAndUpdate(
                { date: date },
                { $push: { country_data: getData1 } },
                { new: true }
              );
            } else {
              console.log(getData1);

              let data = {};
              data.date = date;
              data.country_data = getData;
              let newcountrybackupModel = new countrybackupModel(data);
              let Data1 = await newcountrybackupModel.save();
            }
            res({ status: 200, data: "Data Updated Successfully!!" });
          } else {
            rej({ status: 404, message: "Invalid id!!" });
          }
        } else {
          let newcountryModel = new countryModel(data);
          let saveData = await newcountryModel.save();
          if (saveData) {
            res({ status: 200, data: "Added to Country Successfully!!" });
          } else {
            rej({ status: 404, message: "something went wrong!!" });
          }
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
      let deleteData = await countryModel.deleteOne({
        name: data.name,
      });
      if (deleteData) {
        res({ status: 200, data: "Data Deleted!!" });
      } else {
        rej({ status: 404, message: "Invalid id!!" });
      }
    });
  },
  getcountry: () => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await countryModel.find();
        if (getData) {
          res({ status: 200, data: { data: getData } });
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
