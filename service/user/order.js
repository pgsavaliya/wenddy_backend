const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { encrypt } = require("../../helper/encrypt-decrypt");
const addtocartModel = require("../../model/addtocart.model");
const orderModel = require("../../model/order.model");
const productModel = require("../../model/product.model");
const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AdXwKdtOLChFRJoaGBZW-R6Q5uDL4Ymtbg_JfTsvofWObD2CJgjn-rdybJDHMKtdRwVmclZnEN8ODTdj",
  client_secret:
    "ELJncSDGqYl_8QpZDeH_pO_Zp_IIfGEke2HB5ngJ_9W3aoZnz3gI2NPlsguoXOUeZ5mk0wFH0--3I_hT",
});

module.exports = {
  order: (data) => {
    return new Promise(async (res, rej) => {
      try {
        // console.log("data ........", data);
        let neworderModel = new orderModel(data);
        let saveData = await neworderModel.save();
        if (saveData) {
          const create_payment_json = {
            intent: "sale",
            payer: {
              payment_method: "paypal",
            },
            redirect_urls: {
              return_url: "http://localhost:2000/v1/user/paymant",
              cancel_url: "http://localhost:2000/v1/user/cart/getcart",
            },
            transactions: [
              {
                item_list: {
                  items: [
                    {
                      name: "Red Sox Hat",
                      sku: "001",
                      price: "25.00",
                      currency: "USD",
                      quantity: 1,
                    },
                  ],
                },
                amount: {
                  currency: "USD",
                  total: "25.00",
                },
                description: "welcome to wendy backand",
              },
            ],
          };

          paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
              console.log("error is", error);
              throw error;
            } else {
              for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === "approval_url") {
                  console.log(payment.links);
                  res.redirect(payment.links[i].href);
                }
              }
            }
          });
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
};
