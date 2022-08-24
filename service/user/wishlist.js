const wishlistModel = require("../../model/wishlist.model");
const mongoose = require("mongoose");

module.exports = {
  addwishlist: (user_id, data) => {
    return new Promise(async (res, rej) => {
      try {
        let productdata = await wishlistModel.find({ user_id: user_id });
        console.log("data ...", productdata);
        if (productdata != "") {
          let updateData = await wishlistModel.findOneAndUpdate(
            { user_id: user_id },
            { $addToSet: { product_id: data.product_id } },
            { new: true }
          );
          if (updateData) {
            res({ status: 200, data: "Data Updated!!" });
          } else {
            rej({ status: 500, message: "Something Went Worng!!" });
          }
        } else {
          // data.product_id = [data.product_id];
          data["user_id"] = user_id;
          let newwishlistModel = new wishlistModel(data);
          let saveData = await newwishlistModel.save();
          if (saveData) {
            res({ status: 200, data: "product added in wishlist!!" });
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

  getwishlist: (user_id) => {
    return new Promise(async (res, rej) => {
      try {
        console.log("user_id ......", user_id);
        // let newViewcartModel = new addtocartModel(data);
        let getData = await wishlistModel.aggregate([
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

  delete: (id, data) => {
    return new Promise(async (res, rej) => {
      try {
        console.log("user id", id);
        // let deleteData = await wishlistModel.deleteOne({ user_id: id });
        let deletedData = await wishlistModel.findOneAndUpdate(
          { user_id: id },
          { $pull: { product_id: data } },
          { new: true }
        );
        if (deletedData) {
          res({ status: 200, data: "Data Deleted!!" });
        } else {
          rej({ status: 404, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log(err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

};

  // update: async (_id, data) => {
  //   return new Promise(async (res, rej) => {
  //     try {
  //       let updateData = await wishlistModel.findOneAndUpdate(
  //         { user_id: _id },
  //         { $addToSet: { product_id: data } },
  //         { new: true }
  //       );
  //       if (updateData) {
  //         res({ status: 200, data: "Data Updated!!" });
  //       } else {
  //         rej({ status: 500, error: err, message: "Something Went Worng!!" });
  //       }
  //     } catch (err) {
  //       console.log("err", err);
  //       rej({ status: 500, error: err, message: "something went wrong!!" });
  //     }
  //   });
  // },
