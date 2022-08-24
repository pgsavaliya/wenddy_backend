const productModel = require("../../model/product.model");
const mongoose = require("mongoose");
const userModel = require("../../model/user.model");
const orderModel = require("../../model/order.model");

module.exports = {
  get: (data) => {
    return new Promise(async (res, rej) => {
      let curDate = new Date();
      let gte = new Date(data.query.gte);
      let lte = new Date(data.query.lte);
      if (!data.query.lte) {
        lte = new Date();
      }
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
        let totalorder = await orderModel.find();
        let order = await orderModel.aggregate([
          {
            $match: { createdAt: { $gte: gte, $lte: lte } },
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
              reasult: [
                {
                  $project: {
                    // __v: 0,
                    total: 1,
                  },
                },
              ],
            },
          },
        ]);
        order = order[0];
        let monthearning = 0;
        order.reasult.map((item, index) => {
          monthearning = monthearning + item.total;
        });
        let recentorder = await orderModel.aggregate([
          {
            $facet: {
              result: [
                {
                  $project: {
                    __v: 0,
                  },
                },
                { $sort: { createdAt: -1 } },
                // { $skip: (page - 1) * 10 },
                { $limit: 10 },
              ],
            },
          },
        ]);
        recentorder = recentorder[0];
        let total_revenue = 0;
        totalorder.map((item, index) => {
          total_revenue = total_revenue + item.total;
        });
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
              total_product: product.total_count[0]?.count || 0,
              new_product: newproduct.total_count[0]?.count || 0,
              total_user: user.length || 0,
              total_suspend_user: suspenduser.length || 0,
              new_user: newuser.total_count[0]?.count || 0,
              total_revenue: parseInt(total_revenue),
              month_earning: parseInt(monthearning),
              total_order: totalorder.length || 0,
              order: order.total_count[0]?.count || 0,
              recent_order: recentorder.result || 0,
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
