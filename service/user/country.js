const mongoose = require("mongoose");
const countryModel = require("../../model/country.model");

module.exports = {
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
