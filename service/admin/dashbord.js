const productModel = require("../../model/product.model");
const mongoose = require("mongoose");
const userModel = require("../../model/user.model");

module.exports = {
  get: (data) => {
    return new Promise(async (res, rej) => {
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

        let user = await userModel.find();

        if (product && user) {
          res({
            status: 200,
            data: {
              total_product: product.total_count[0].count || 0,
              total_user: user.length || 0,
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
