const mongoose = require("mongoose");
const subscribeModel = require("../../model/subscribe.model");

module.exports = {
  getsubscribe: () => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await subscribeModel.find();
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
