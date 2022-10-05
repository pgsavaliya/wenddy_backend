const orderModel = require("../../model/order.model");
const cartModel = require("../../model/addtocart.model");
const productModel = require("../../model/product.model");
const mongoose = require("mongoose");

module.exports = {
  order: (data) => {
    return new Promise(async (res, rej) => {
      try {
        // let newData1 = [];
        console.log("4vnruiegnwurhnuwruwehguweip");
        if (data.payment_data.payments.captures[0].status == 'COMPLETED') {
          console.log("435y3784y3hnfui");
          let newData = await data.product.map(async (item) => {
            // let productData = await productModel.findOne({ uniqueCode: item.product_id });
            //   // console.log("item .....", productData);
            //   item["product_title"] = productData.product_title;
            //   item["product_image"] = productData.image[0];
            let findData = await cartModel.findById(item.cart_id);
            //   // console.log("findData .......", findData);
            if (findData) {
              // console.log("4t7892y4thu");
              let cartData = await cartModel.deleteMany({ _id: mongoose.Types.ObjectId(item.cart_id), user_id: mongoose.Types.ObjectId(data.user_id) });
                console.log("cartData .......", cartData);
            }
            //   newData1.concat(item);
          })
          // console.log("newData1 .......", newData1);
          // console.log("xyz .......", xyz);
          // console.log("data ........", data);
          let neworderModel = new orderModel(data);
          let saveData = await neworderModel.save();
          // res(saveData);
          if (saveData) {
            res({ status: 200, message: "Data Added Successfully..." });
          } else {
            rej({ status: 404, message: "something went wrong!!" });
          }
        }
        else {
          rej({ status: 500, message: "something went wrong with payment!!" });
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

  payment: (data) => {
    return new Promise(async (res, rej) => {
      try {
        res(data);
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

  getorder: (user_id, page, limit) => {
    return new Promise(async (res, rej) => {
      try {
        page = parseInt(page);
        limit = parseInt(limit);
        let getData = await orderModel.aggregate([
          {
            $match: {
              user_id: mongoose.Types.ObjectId(user_id),
              is_cancel: "false",
            }
          },
          {
            $facet: {
              total_count: [
                {
                  $group: {
                    _id: null,
                    count: { $sum: 1 }
                  }
                }
              ],
              result: [
                {
                  $project: {
                    __v: 0,
                  }
                },
                { $sort: { createdAt: -1 } },
                { $skip: (page - 1) * limit },
                { $limit: limit },
              ]
            }
          }
        ]);
        getData = getData[0];
        if (getData.result.length > 0) {
          res({
            status: 200, data: {
              total_count: getData.total_count[0].count,
              result: getData.result,
            },
          });
        } else {
          rej({ status: 404, message: "data not found!!" });
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

  cancel: async (_id) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await orderModel.findByIdAndUpdate(
          _id,
          { is_cancel: "true" },
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

  byId: (id) => {
    return new Promise(async (res, rej) => {
      try {
        // console.log("cncvo");
        let Data = await orderModel.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(id),
            },
          },
          {
            $lookup: {
              from: "addresses",
              localField: "address_id",
              foreignField: "_id",
              as: "orderAddressData",
            },
          },
          // {$unwind:'$orderAddressData'},
        ]);
        Data = Data[0];
        // console.log("data .....", Data);
        if (Data) {
          res({
            status: 200,
            data: Data,
          });
        } else {
          rej({ status: 404, message: "Invalid id..!!" });
        }
        // rej({
        //   status: 404,
        //   message: "Data Not Found, Invalid id!!",
        //   error: {},
        // });
      } catch (err) {
        console.log(err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },
};
