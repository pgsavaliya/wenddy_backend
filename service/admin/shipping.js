const shippingModel = require("../../model/shipping.model");
const countryModel = require("../../model/country.model");
const mongoose = require("mongoose");

module.exports = {
  addshipping: (data) => {
    return new Promise(async (res, rej) => {
      try {
        let countrydata = await shippingModel.find({
          country_name: data.country_name,
        });
        // console.log("data ...", productdata);
        if (countrydata != "") {
          let updateData = await shippingModel.findOneAndUpdate(
            { profile_name: data.profile_name },
            { $addToSet: { country: data.country } },
            { new: true }
          );
          if (updateData) {
            res({ status: 200, data: "Data Updated!!" });
          } else {
            rej({ status: 500, message: "Something Went Worng!!" });
          }
        } else {
          // data.product_id = [data.product_id];
          let newshippingModel = new shippingModel(data);
          let saveData = await newshippingModel.save();
          if (saveData) {
            res({ status: 200, data: "shipping data added!!" });
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

  //   getwishlist: ({ user_id, country }) => {
  //     return new Promise(async (res, rej) => {
  //       try {
  //         console.log("user_id ......", user_id);
  //         // let newViewcartModel = new addtocartModel(data);
  //         let getData = await wishlistModel.aggregate([
  //           {
  //             $match: {
  //               user_id: mongoose.Types.ObjectId(user_id),
  //             },
  //           },
  //           {
  //             $lookup: {
  //               from: "products",
  //               localField: "product_id",
  //               foreignField: "_id",
  //               as: "product_data",
  //             },
  //           },
  //         ]);
  //         getData = getData[0];
  //         if (getData) {
  //           // console.log("getData .......", getData);
  //           if (country) {
  //             let countryData = await countryModel.findOne({ currency: country });
  //             console.log(countryData);
  //             if (countryData) {
  //               getData.product_data.map((item) => {
  //                 item.real_price = item.real_price * countryData.price;
  //                 item.mrp = item.mrp * countryData.price;
  //                 item.product_variation.map((item1) => {
  //                   item1.real_price = item1.real_price * countryData.price;
  //                   item1.mrp = item1.mrp * countryData.price;
  //                 });
  //               });
  //             }
  //           }
  //           res({ status: 200, data: getData });
  //         } else {
  //           rej({ status: 404, message: "Invalid id!!" });
  //         }
  //       } catch (err) {
  //         console.log("err ...", err);
  //         rej({
  //           status: err?.status || 500,
  //           error: err,
  //           message: err?.message || "Something Went Wrong!!!",
  //         });
  //       }
  //     });
  //   },

  delete: (_id) => {
    return new Promise(async (res, rej) => {
      try {
        let deleteData = await shippingModel.findByIdAndDelete(_id);
        if (deleteData) {
          res({ status: 200, data: "Data Deleted!!" });
        } else {
          rej({ status: 404, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log(err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },
};

// update: async (_id, data) => {
//   return new Promise(async (res, rej) => {
//     try {
//       let updateData = await wishlistModel.findOneAndUpdate(
//         { user_id: _id },
//         { $addToSet: { product_id: data } },
//         { new: true }
//       );
//       if (updateData) {
//         res({ status: 200, data: "Data Updated!!" });
//       } else {
//         rej({ status: 500, error: err, message: "Something Went Worng!!" });
//       }
//     } catch (err) {
//       console.log("err", err);
//       rej({ status: 500, error: err, message: "something went wrong!!" });
//     }
//   });
// },
