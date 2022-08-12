const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { encrypt } = require("../../helper/encrypt-decrypt");
const addtocartModel = require("../../model/addtocart.model");
const productModel = require("../../model/product.model");

module.exports = {
  addtocart: (data) => {
    return new Promise(async (res, rej) => {
      try {
        console.log("data ........", data);
        let productData = await productModel.findById(data.product_id);
        console.log("productData.mrp .......", productData.mrp);
        data["product_amount"] = productData.mrp;
        data["total_price"] = data.quantity * data.product_amount;
        let newAddtocartModel = new addtocartModel(data);
        let saveData = await newAddtocartModel.save();
        if (saveData) {
          res({ status: 200, data: "Added to Cart Successfully!!" });
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
  getcart: (data) => {
    return new Promise(async (res, rej) => {
      try {
        // let newViewcartModel = new addtocartModel(data);
        let getData = await addtocartModel.aggregate([
          {
            $match: {
              userId: data.userId,
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "product_id",
              foreignField: "_id",
              as: "product_data",
            },
          },
        ]);
        if (getData) {
          res({ status: 200, data: getData });
        } else {
          rej({ status: 404, message: "Invalid id!!" });
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

  update: async (_id, data) => {
    return new Promise(async (res, rej) => {
      try {
        let productId = await addtocartModel.findById(_id);
        if (productId) {
          let productData = await productModel.findById(productId.product_id);
          // console.log("pavan", productData);
          data["product_amount"] = productData.mrp;
          data["total_price"] = data.quantity * data.product_amount;
          let getData = await addtocartModel.findByIdAndUpdate(_id, data, {
            new: true,
          });
          if (getData) {
            res({ status: 200, data: "update" });
          } else {
            rej({ status: 404, message: "Invalid id!!" });
          }
        } else {
          rej({ status: 404, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log("err", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },
  delete: (_id) => {
    return new Promise(async (res, rej) => {
      try {
        let deleteData = await addtocartModel.findByIdAndDelete(_id);
        if (deleteData) {
          res({ status: 200, data: "Data Deleted!!" });
        } else {
          rej({ status: 500, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log(err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },
};
