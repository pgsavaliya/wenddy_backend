const orderModel = require("../../model/order.model");
const { default: mongoose } = require("mongoose");
// const paypal = require("paypal-rest-sdk");
// const path = require("path");
// require("dotenv").config({ path: path.join(__dirname, "./config/.env") });

// paypal.configure({
//   mode: process.env.MODE, //sandbox or live
//   client_id: process.env.CLIENT_ID,
//   client_secret: process.env.CLIENT_SECRET,
// });

module.exports = {
  order: (data) => {
    return new Promise(async (res, rej) => {
      try {
        // console.log("data ........", data);
        // let saveData1 = new Promise(async (res, rej) => {
        let neworderModel = new orderModel(data);
        let saveData = await neworderModel.save();
        // res(saveData);
        if (saveData) {
          rej({ status: 200, message: "Data Added Successfully..." });

          // const create_payment_json = {
          //   intent: "sale",
          //   payer: {
          //     payment_method: "paypal",
          //   },
          //   redirect_urls: {
          //     return_url: "http://localhost:2000/v1/user/paymant",
          //     cancel_url: "http://localhost:2000/v1/user/cart/getcart",
          //   },
          //   transactions: [
          //     {
          //       item_list: {
          //         items: [
          //           {
          //             name: "Red Sox Hat",
          //             sku: "001",
          //             price: "25.00",
          //             currency: "USD",
          //             quantity: 1,
          //           },
          //         ],
          //       },
          //       amount: {
          //         currency: "USD",
          //         total: "25.00",
          //       },
          //       description: "welcome to wendy backand",
          //     },
          //   ],
          // };

          // paypal.payment.create(create_payment_json, function (error, payment) {
          //   if (error) {
          //     console.log("error is", error);
          //     throw error;
          //   } else {
          //     for (let i = 0; i < payment.links.length; i++) {
          //       if (payment.links[i].rel === "approval_url") {
          //         // console.log(payment.links[i].href);
          //         // window.open(payment.links[i].href);
          //         res({ status: 200, data: payment.links[i].href });
          //       }
          //     }
          //   }
          // });
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

  getorder: (user_id) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await orderModel.find({
          user_id: user_id,
          is_cancel: "false",
        });
        if (getData != "") {
          res({ status: 200, data: getData });
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
              from: "products",
              localField: "product.product_id",
              foreignField: "uniqueCode",
              as: "productData",
            },
          },
          // {$unwind:'$productData'},
        ]);
        Data = Data[0];
        // console.log("data .....", Data);
        if (Data) {
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
};
