const { default: mongoose } = require("mongoose");
const orderModel = require("../../model/order.model");

module.exports = {
  getorder: (page, limit) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await orderModel.aggregate([
          // {
          //   $lookup: {
          //     from: "products",
          //     localField: "product.product_id",
          //     foreignField: "uniqueCode",
          //     as: "productData",
          //   },
          // },
          // { $unwind: "$productData" },
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
                { $skip: (+page - 1) * +limit },
                { $limit: +limit },
              ],
            },
          },
        ]);
        getData = getData[0];
        if (getData) {
          res({ status: 200, data: getData });
        } else {
          rej({ status: 404, message: "Data Not found!!" });
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

  byId: (id) => {
    return new Promise(async (res, rej) => {
      try {
        let Data = await orderModel.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(id),
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "product.product_id",
              foreignField: "uniqueCode",
              as: "productData",
            },
          },
        ]);
        if (Data) {
          Data = Data[0];
          res({
            status: 200,
            data: Data,
          });
        } else {
          rej({ status: 404, message: "Data Not Found", error: {} });
        }
        rej({
          status: 404,
          message: "Data Not Found, Invalid id!!",
          error: {},
        });
      } catch (err) {
        console.log(err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

  update: async (_id, data) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await orderModel.findByIdAndUpdate(
          _id,
          { status: data },
          {
            new: true,
          }
        );
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
};
