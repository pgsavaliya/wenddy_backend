const reviewModel = require("../../model/reviewproduct.model");
const mongoose = require("mongoose");

module.exports = {
  // add: (data) => {
  //     return new Promise(async (res, rej) => {
  //         try {
  //             let newreviewModel = new reviewModel(data);
  //             let saveData = await newreviewModel.save();
  //             if (saveData) {
  //                 res({ status: 200, data: {} });
  //             } else {
  //                 rej({ status: 404, message: "someting went wrong!!" });
  //             }
  //         } catch (err) {
  //             console.log("err ........", err);
  //             rej({ status: 500, error: err, message: "something went wrong!!" });
  //         }
  //     });
  // },

  update: async (_id, data) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await reviewModel.findByIdAndUpdate(_id, data, {
          new: true,
        });
        if (getData) {
          res({ status: 200, data: "" });
        } else {
          rej({ status: 404, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log("err", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

  getAll: (page, limit, str, startDate, endDate, status) => {
    return new Promise(async (res, rej) => {
      try {
        let qry = {};
        page = parseInt(page);
        limit = parseInt(limit);
        if (startDate && endDate) {
          startDate = new Date(startDate);
          endDate = new Date(endDate);
          endDate.setDate(endDate.getDate() + 1);
          qry["$and"] = [
            { createdAt: { $gt: startDate } },
            { createdAt: { $lt: endDate } },
          ];
        }
        // console.log(str);
        if (str) {
          qry["$or"] = [{ review_title: { $regex: str, $options: "i" } }];
        }
        // if (status) {
        //     qry["status"] = status;
        // }
        let getData = await reviewModel.aggregate([
          { $match: qry },
          //   {
          //     $lookup: {
          //       from: "transactions",
          //       localField: "_id",
          //       foreignField: "idOfCompanyProperty",
          //       as: "propertyTransactionData",
          //     },
          //   },
          // { $unwind: "$propertyTransactionData" },
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
                    __v: 0,
                  },
                },
                { $sort: { createdAt: -1 } },
                { $skip: (page - 1) * limit },
                { $limit: limit },
              ],
            },
          },
        ]);
        getData = getData[0];
        // console.log("getData.total_count[0] ...........", getData.total_count);
        // console.log("getData ...........", getData);
        if (getData.result.length > 0) {
          //   getData.result = getData.result.map((item, index) => {
          //     let uniqueUser = [
          //       ...new Set(
          //         item.toatlInvestedData.map((i) => i.customerId.toString())
          //       ),
          //     ].length;

          //     delete item.toatlInvestedData;
          //     return {
          //       ...item,
          //       uniqueUser,
          //       fundedByUser:
          //         (item.totalInvestedAmountByUser / item.totalAmount) * 100 || 0,
          //       index: getData.total_count[0].count - index,
          //     };
          //   });
          res({
            status: 200,
            data: {
              total_count: getData.total_count[0].count,
              result: getData.result,
            },
          });
        } else {
          rej({ status: 404, message: "No Data Found!!" });
        }
      } catch (err) {
        console.log("err ....", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

  byId: (_id) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await reviewModel.findById(_id);
        if (getData) {
          res({ status: 200, data: getData });
        } else {
          rej({ status: 404, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log(err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

  delete: (_id) => {
    return new Promise(async (res, rej) => {
      try {
        let deleteData = await reviewModel.findByIdAndDelete(_id);
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
