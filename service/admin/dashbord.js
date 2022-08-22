const productModel = require("../../model/product.model");
const mongoose = require("mongoose");
const userModel = require("../../model/user.model");
const orderModel = require("../../model/order.model");

module.exports = {
  get: (data) => {
    return new Promise(async (res, rej) => {
      let lastmonth = new Date();
      lastmonth.setMonth(lastmonth.getMonth() - 1);
      let lastweek = new Date();
      lastweek.setDate(lastweek.getDate() - 7);
      let lastday = new Date();
      lastday.setDate(lastday.getDate() - 1);
      try {
        let product = await productModel.aggregate([
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
            },
          },
        ]);
        product = product[0];
        let newproduct = await productModel.aggregate([
          {
            $match: {
              createdAt: {
                $gte: lastmonth,
              },
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
            },
          },
        ]);
        newproduct = newproduct[0];
        let lastmonthorder = await orderModel.aggregate([
          {
            $match: {
              createdAt: {
                $gte: lastmonth,
              },
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
            },
          },
        ]);
        lastmonthorder = lastmonthorder[0];
        let lastweekorder = await orderModel.aggregate([
          {
            $match: {
              createdAt: {
                $gte: lastweek,
              },
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
            },
          },
        ]);
        lastweekorder = lastweekorder[0];
        let order = await orderModel.find();
        let user = await userModel.find();
        let suspenduser = await userModel.find({ user_status: false });
        let newuser = await userModel.aggregate([
          {
            $match: {
              createdAt: {
                $gte: lastday,
              },
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
            },
          },
        ]);
        newuser = newuser[0];
        if (product && user) {
          res({
            status: 200,
            data: {
              total_product: product.total_count[0].count || 0,
              new_product: newproduct.total_count[0].count || 0,
              total_user: user.length || 0,
              total_suspend_user: suspenduser.length || 0,
              new_user: newuser.total_count[0].count || 0,
              total_order: order.length || 0,
              total_order_lastmonth: lastmonthorder.total_count[0].count || 0,
              total_order_lastweek: lastweekorder.total_count[0].count || 0,
            },
          });
        }
      } catch (err) {
        console.log("err ....", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },
};
