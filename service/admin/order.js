const mongoose= require("mongoose");
const orderModel = require("../../model/order.model");
const addressModel = require("../../model/address.model");

module.exports = {
  getorder: (page, limit) => {
    if (page && limit) {
      return new Promise(async (res, rej) => {
        try {
          let getData = await orderModel.aggregate([
            {
              $match: {
                is_cancel: "false",
              },
            },
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
                    $addFields: {
                      address: []
                    }
                  },
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
          let abcd = await Promise.all(getData.result.map(async (item, index) => {
            let address_id = item.address_id;
            let addressOrderData = await addressModel.findOne({ "address._id": address_id }, { address: 1 });
            let abc = item;
            abc.address.push(addressOrderData)
            return abc
          }));
          if (getData) {
            res({
              status: 200, data: {
                total_count: getData.total_count[0].count,
                result: abcd,
              },
            });
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
    } else {
      return { status: 404, data: "pagination is require...." };
    }
  },

  getcancelorder: (page, limit) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await orderModel.aggregate([
          {
            $match: {
              is_cancel: "true",
            },
          },
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
