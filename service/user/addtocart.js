const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { encrypt } = require("../../helper/encrypt-decrypt");
const addtocartModel = require("../../model/addtocart.model");

module.exports = {
  addtocart: (data) => {
    return new Promise(async (res, rej) => {
      try {
        let newAddtocartModel = new addtocartModel(data);
        let saveData = await newAddtocartModel.save();
        if (saveData) {
          res({ status: 200, data: "product added Successfully!!" });
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
  getcart: (data) => {
    return new Promise(async (res, rej) => {
      try {
        // let newViewcartModel = new addtocartModel(data);
        let getData = await addtocartModel.find({ userId: data.user_id });
        if (getData) {
          res({ status: 200, data: getData });
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
};
