const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { encrypt } = require("../../helper/encrypt-decrypt");
const userModel = require("../../model/user.model");

module.exports = {
  getprofile: (data) => {
    return new Promise(async (res, rej) => {
      try {
        console.log(data.user_id);
        // let newViewcartModel = new addtocartModel(data);
        let getData = await userModel.findById(data.user_id);

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

  update: async (_id, data) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await userModel.findByIdAndUpdate(_id, data);
        if (getData) {
          res({ status: 200, data: "update" });
        } else {
          rej({ status: 404, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log("err", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },
  // delete: (_id) => {
  //   return new Promise(async (res, rej) => {
  //     try {
  //       let deleteData = await addtocartModel.findByIdAndDelete(_id);
  //       if (deleteData) {
  //         res({ status: 200, data: "Data Deleted!!" });
  //       } else {
  //         rej({ status: 500, message: "Invalid id!!" });
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       rej({ status: 500, error: err, message: "something went wrong!!" });
  //     }
  //   });
  // },
};
