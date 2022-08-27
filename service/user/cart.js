const mongoose = require("mongoose");
const addtocartModel = require("../../model/addtocart.model");
const productModel = require("../../model/product.model");
const countryModel = require("../../model/country.model");

module.exports = {
  addtocart: (user_id, data) => {
    return new Promise(async (res, rej) => {
      try {
        let productData = await productModel.findById(data.product_id);
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
              res({ status: 200, data: "Data Updated Successfully!!" });
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
          data["user_id"] = user_id;
          // data["product_amount"] = data.price;
          data["total_price"] = data.quantity * data.price;
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

  getcart: ({ user_id, country }) => {
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
        if (getData) {
          if (country) {
            let countryData = await countryModel.findOne({ currency: country });
            console.log(countryData);
            if (countryData) {
              getData.map((item2) => {
                item2.total_price = item2.total_price * countryData.price;
                item2.price = item2.price * countryData.price;
                item2.product_data.map((item) => {
                  item.real_price = item.real_price * countryData.price;
                  item.mrp = item.mrp * countryData.price;
                  item.product_variation.map((item1) => {
                    item1.real_price = item1.real_price * countryData.price;
                    item1.mrp = item1.mrp * countryData.price;
                  });
                });
              });
            }
          }
          let total = 0;
          getData.map((item) => {
            total = total + item.total_price;
          });
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
