const bcryptjs = require("bcryptjs");
const userModel = require("../../model/user.model");

module.exports = {
  getprofile: (user_id) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await userModel.findById(user_id);
        if (getData) {
          res({ status: 200, data: getData });
        } else {
          rej({ status: 404, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log("err ...", err);
        rej({ status: err?.status || 500, error: err, message: err?.message || "Something Went Wrong!!!" });
      }
    });
  },

  update: async (_id, data) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await userModel.findByIdAndUpdate(_id, data, { new: true });
        if (getData) {
          res({ status: 200, data: "update" });
        } else {
          rej({ status: 404, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log("err", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

  resetpss: async (_id, data) => {
    return new Promise(async (res, rej) => {
      try {
        let cpassword = data.comfirmpassword;
        if (data.password == cpassword) {
          let getData1 = await userModel.findById(_id);
          if (getData1) {
            const isMatch = await bcryptjs.compare(
              data.oldpassword,
              getData1.password
            );
            if (isMatch) {
              let encryptPassword = await bcryptjs.hash(data.password, 12);
              let password = { password: encryptPassword };
              console.log("passwird.. ", password);
              let getData = await userModel.findByIdAndUpdate(_id, password);
              if (getData) {
                res({ status: 200, data: getData });
              } else {
                rej({ status: 404, message: "Something went worng" });
              }
            } else {
              rej({
                status: 500,
                error: "old password worng",
                message: "something went wrong!!",
              });
            }
          }
        } else {
          rej({
            status: 500,
            error: "password and confirm password not match",
            message: "something went wrong!!",
          });
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
  //       let deleteData = await userModel.findByIdAndDelete(_id);
  //       if (deleteData) {
  //         res({ status: 200, data: "Data Deleted!!" });
  //       } else {
  //         rej({ status: 404, message: "Invalid id!!" });
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       rej({ status: 500, error: err, message: "something went wrong!!" });
  //     }
  //   });
  // },

};

  // forgotepss: async (_id, data) => {
  //   return new Promise(async (res, rej) => {
  //     try {
  //       let cpassword = data.comfirmpassword;
  //       if (data.password == cpassword) {
  //         let getData1 = await userModel.findById(_id);
  //         if (getData1) {
  //           const isMatch = await bcryptjs.compare(
  //             data.oldpassword,
  //             getData1.password
  //           );
  //           if (isMatch) {
  //             let encryptPassword = await bcryptjs.hash(data.password, 12);
  //             let password = { password: encryptPassword };
  //             console.log("passwird.. ", password);
  //             let getData = await userModel.findByIdAndUpdate(_id, password);
  //             if (getData) {
  //               res({ status: 200, data: getData });
  //             } else {
  //               rej({ status: 404, message: "Something went worng" });
  //             }
  //           } else {
  //             rej({
  //               status: 500,
  //               error: "old password worng",
  //               message: "something went wrong!!",
  //             });
  //           }
  //         }
  //       } else {
  //         rej({
  //           status: 500,
  //           error: "password and confirm password not match",
  //           message: "something went wrong!!",
  //         });
  //       }
  //     } catch (err) {
  //       console.log("err", err);
  //       rej({ status: 500, error: err, message: "something went wrong!!" });
  //     }
  //   });
  // },
