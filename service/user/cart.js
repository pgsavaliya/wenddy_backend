const mongoose = require("mongoose");
const addtocartModel = require("../../model/addtocart.model");
const productModel = require("../../model/product.model");

module.exports = {
  addtocart: (user_id, data) => {
    return new Promise(async (res, rej) => {
      try {
        let productData = await productModel.findById(data.product_id);
        console.log("data ........", data);
        let productId = await addtocartModel.findOne({ product_id: data.product_id });
        console.log("productId ........", productId);
        if (productId) {
          if (data.quantity != 0) {
            data['user_id'] = user_id;
            data["product_amount"] = productData.mrp;
            data["total_price"] = data.quantity * data.product_amount;
            let getData = await addtocartModel.findOneAndUpdate({ product_id: productId.product_id }, data, { new: true });
            if (getData) {
              res({ status: 200, data: "Data Updated Successfully!!" });
            } else {
              rej({ status: 404, message: "Invalid id!!" });
            }
          } else {
            let deleteData = await addtocartModel.findOneAndDelete({ product_id: data.product_id });
            if (deleteData) {
              res({ status: 200, data: "Data Deleted!!" });
            } else {
              rej({ status: 404, message: "Invalid id!!" });
            }
          }
        } else {
          data['user_id'] = user_id;
          data["product_amount"] = productData.mrp;
          data["total_price"] = data.quantity * data.product_amount;
          let newAddtocartModel = new addtocartModel(data);
          let saveData = await newAddtocartModel.save();
          if (saveData) {
            res({ status: 200, data: "Added to Cart Successfully!!" });
          } else {
            rej({ status: 404, message: "something went wrong!!" });
          }
        }
      } catch (err) {
        console.log("err ...", err);
        rej({ status: err?.status || 500, error: err, message: err?.message || "Something Went Wrong!!!" });
      }
    });
  },

  getcart: (user_id) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await addtocartModel.aggregate([
          {
            $match: {
              user_id: mongoose.Types.ObjectId(user_id),
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
        let total = 0;
        getData.map((item) => {
          total = total + item.total_price;
        });
        if (getData) {
          res({ status: 200, data: { total: total, data: getData } });
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

};

  // update: async (_id, data) => {
  //   return new Promise(async (res, rej) => {
  //     try {
  //       let productId = await addtocartModel.findById(_id);
  //       if (productId) {
  //       } else {
  //         rej({ status: 404, message: "Invalid id!!" });
  //       }
  //     } catch (err) {
  //       console.log("err", err);
  //       rej({ status: 500, error: err, message: "something went wrong!!" });
  //     }
  //   });
  // },
  // delete: (_id) => {
  //   return new Promise(async (res, rej) => {
  //     try {
  //       let deleteData = await addtocartModel.findByIdAndDelete(_id);
  //       if (deleteData) {
  //         res({ status: 200, data: "Data Deleted!!" });
  //       } else {
  //         rej({ status: 500, message: "Invalid id!!" });
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       rej({ status: 500, error: err, message: "something went wrong!!" });
  //     }
  //   });
  // },
