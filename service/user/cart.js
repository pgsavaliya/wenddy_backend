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
        let getData1 = await addtocartModel.findOne({
          product_id: data.product_id,
          price: data.price,
          metal: data.metal,
          dimand_type: data.dimand_type,
          user_id: data.user_id,
          ring_size: data.ring_size,
        });
        console.log("getData", getData1);
        if (getData1) {
          if (data.quantity != 0) {
            data["total_price"] = data.quantity * data.price;
            let getData = await addtocartModel.updateOne(
              {
                product_id: getData1.product_id,
                price: getData1.price,
                metal: getData1.metal,
                dimand_type: getData1.dimand_type,
                user_id: getData1.user_id,
                ring_size: getData1.ring_size,
              },
              data,
              {
                new: true,
              }
            );
            if (getData) {
              res({ status: 200, data: "update" });
            } else {
              rej({ status: 404, message: "Invalid id!!" });
            }
          } else {
            let deleteData = await addtocartModel.deleteOne({
              product_id: data.product_id,
              price: data.price,
              metal: data.metal,
              dimand_type: data.dimand_type,
              user_id: data.user_id,
              ring_size: data.ring_size,
            });
            if (deleteData) {
              res({ status: 200, data: "Data Deleted!!" });
            } else {
              rej({ status: 404, message: "Invalid id!!" });
            }
          }
        } else {
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
        let total = 0;
        getData.map((item, index) => {
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

  update: async (_id, data) => {
    return new Promise(async (res, rej) => {
      try {
        let productId = await addtocartModel.findById(_id);
        if (productId) {
          // console.log("ptoduct id =", productId);
        } else {
          rej({ status: 404, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log("err", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },
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
};
