const addressModel = require("../../model/address.model");

module.exports = {
  add: (user_id, data) => {
    return new Promise(async (res, rej) => {
      try {
        data["user_id"] = user_id;
        let existData = [await addressModel.findOne({ user_id })];
        console.log("existData ...........", existData);
        console.log("existData.length ...........", existData.length);
        if (existData.length > 0) {
          let removedData = await addressModel.findOneAndDelete({ user_id });
          let ifNnewAddressModel = new addressModel(data);
          let if_saveData = await ifNnewAddressModel.save();
          if (if_saveData) {
            res({ status: 200, data: "Data Added Successfully!!" });
          } else {
            rej({ status: 404, message: "something went wrong!!" });
          }
        } else {
          let newAddressModel = new addressModel(data);
          let saveData = await newAddressModel.save();
          if (saveData) {
            res({ status: 200, data: "Data Added Successfully!!" });
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

  addMultiAddress: (user_id, _id, data) => {
    return new Promise(async (res, rej) => {
      try {
        data["user_id"] = user_id;
        let updateData = await addressModel.findByIdAndUpdate(_id, data, {
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
  deleteone: (user_id, address_id, address) => {
    return new Promise(async (res, rej) => {
      try {
        console.log("userId ..............", user_id);
        let updateData = await addressModel.findOneAndUpdate(
          {
            user_id: user_id,
            "address._id": address_id,
          },
          {
            $pull: { address: address_id },
          },
          { new: true }
        );
        if (updateData) {
          res({ status: 200, data: "Data Deleted Successfully!!" });
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
        let getData = await addressModel.findOne({ user_id });
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
