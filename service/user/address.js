const addressModel = require("../../model/address.model");
const userModel = require("../../model/user.model");
const { default: mongoose } = require("mongoose");


module.exports = {
  add: (_id, data) => {
    return new Promise(async (res, rej) => {
      try {
        data["user_id"] = _id;
        let userData = await userModel.find({ _id: _id });
        console.log("userData ....", userData.length);
        if (userData.length > 0) {
          data.email = userData[0].email;
          data.mobile = userData[0].mobile;
          let existData = await addressModel.find({ user_id: _id });
          console.log("existData.length ...........", existData.length);
          if (existData.length > 0) {
            let removedData = await addressModel.findOneAndDelete({ user_id: _id });
            //   let ifNnewAddressModel = new addressModel(data);
            //   let if_saveData = await ifNnewAddressModel.save();
            //   if (if_saveData) {
            //     res({ status: 200, data: "Data Added Successfully!!" });
            //   } else {
            //     rej({ status: 404, message: "something went wrong!!" });
            //   }
            // } else {
          }
          let newAddressModel = new addressModel(data);
          let saveData = await newAddressModel.save();
          if (saveData) {
            res({ status: 200, data: "Data Added Successfully!!" });
          } else {
            rej({ status: 404, message: "something went wrong!!" });
          }
        } else {
          rej({ status: 404, message: "user not found!!" });
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

  addMultiAddress: (user_id, _id, data) => {
    return new Promise(async (res, rej) => {
      try {
        if (data.address[0].is_primary === true) {
          let defaultData = await addressModel.updateOne({ user_id: user_id }, { $set: { 'address.$[].is_primary': false } });
        }
        data["user_id"] = user_id;
        let updateData = await addressModel.findByIdAndUpdate(_id, { $push: { address: data.address } }, {
          new: true,
        });
        if (updateData) {
          res({ status: 200, data: "Data Updated Successfully!!" });
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

  update: (user_id, address_id, address) => {
    return new Promise(async (res, rej) => {
      try {
        if (address.is_primary === true) {
          //badha address ne flase karvana
          //pachi addresis _tyue
          let defaultData = await addressModel.updateOne({ user_id: user_id }, { $set: { 'address.$[].is_primary': false } });
        }
        let updateData = await addressModel.findOneAndUpdate(
          { user_id: user_id, "address._id": address_id },
          { $set: { "address.$": address } },
          { new: true }
        );
        if (updateData) {
          res({ status: 200, data: "Data Updated Successfully!!" });
        } else {
          rej({ status: 404, message: "Invalid Address Id!!" });
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

  deleteOne: (user_id, address_id) => {
    return new Promise(async (res, rej) => {
      try {
        let updateData = await addressModel.findOneAndUpdate(
          { user_id: user_id, "address._id": address_id },
          { $pull: { "address": { _id: address_id } } },
          { new: true }
        );
        if (updateData) {
          res({ status: 200, data: "Data Updated Successfully!!" });
        } else {
          rej({ status: 404, message: "Invalid Address Id!!" });
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

  // primaryUpdate: (user_id, _id, data) => {
  //     return new Promise(async (res, rej) => {
  //         try {
  //             data['user_id'] = user_id;
  //             let updateData = await addressModel.findByIdAndUpdate(_id, data, { new: true });
  //             if (updateData) {
  //                 res({ status: 200, data: "Data Updated Successfully!!" });
  //             } else {
  //                 rej({ status: 404, message: "something went wrong!!" });
  //             }
  //         } catch (err) {
  //             console.log("err ...", err);
  //             rej({
  //                 status: err?.status || 500,
  //                 error: err,
  //                 message: err?.message || "Something Went Wrong!!!",
  //             });
  //         }
  //     });
  // },

  getAll: (user_id) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await addressModel.findOne({ user_id: user_id });
        if (getData) {
          res({ status: 200, data: getData });
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

  byId: (id, user_id) => {
    return new Promise(async (res, rej) => {
      try {
        let Data = await addressModel.aggregate([
          {
            $match: {
              user_id: mongoose.Types.ObjectId(user_id),
            },
          },
          { $unwind: "$address" },
          {
            $match: {
              "address._id": mongoose.Types.ObjectId(id),
            }
          }
        ]);
        if (Data) {
          Data = Data[0];
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

  delete: (_id) => {
    return new Promise(async (res, rej) => {
      try {
        let deleteData = await addressModel.findByIdAndDelete(_id);
        if (deleteData) {
          res({ status: 200, data: "Data Deleted Successfully!!" });
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
