const mongoose = require("mongoose");
const reviewproductModel = require("../../model/reviewproduct.model");

module.exports = {
  addreview: (data) => {
    return new Promise(async (res, rej) => {
      try {
        console.log("data ........", data);
        let newReviewModel = new reviewproductModel(data);
        let saveData = await newReviewModel.save();
        if (saveData) {
          res({ status: 200, data: "Added to review Successfully!!" });
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

  getreview: (product_id, page, limit) => {
    return new Promise(async (res, rej) => {
      try {
        let qry = {};
        page = parseInt(page);
        limit = parseInt(limit);
        // console.log(product_id);
        qry = { product_id: mongoose.Types.ObjectId(product_id) };
        let getData = await reviewproductModel.aggregate([
          { $match: qry },
          {
            $facet: {
              total_count: [
                {
                  $group: {
                    _id: null,
                    count: { $sum: 1 },
                  },
                },
              ],
              result: [
                {
                  $project: {
                    email:0,
                    __v: 0,
                  },
                },
                { $sort: { rating: -1 } },
                { $skip: (page - 1) * limit },
                { $limit: limit },
              ],
            },
          },
        ]);
        getData = getData[0];
        if (getData.result.length > 0) {
          res({
            status: 200,
            data: {
              total_count: getData.total_count[0].count,
              result: getData.result,
            },
          });
        } else {
          rej({ status: 404, message: "No data found!!" });
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

// update: async (_id, data) => {
//   return new Promise(async (res, rej) => {
//     try {
//       let getData = await reviewproductModel.findByIdAndUpdate(_id, data, {
//         new: true,
//       });
//       if (getData) {
//         res({ status: 200, data: "update" });
//       } else {
//         rej({ status: 404, message: "Invalid id!!" });
//       }
//     } catch (err) {
//       console.log("err", err);
//       rej({ status: 500, error: err, message: "something went wrong!!" });
//     }
//   });
// },
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
