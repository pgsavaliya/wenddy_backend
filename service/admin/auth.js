const adminModel = require("../../model/admin.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { encrypt } = require("../../helper/encrypt-decrypt");

module.exports = {
  register: (data) => {
    return new Promise(async (res, rej) => {
      try {
        let newAdminModel = new adminModel(data);
        let saveData = await newAdminModel.save();
        if (saveData) {
          res({ status: 200, data: "Admin Registered Successfully!!" });
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

  login: (email, password) => {
    return new Promise(async (res, rej) => {
      try {
        let loginData = await adminModel.findOne({ email });
        console.log("loginData ......", loginData);
        if (loginData) {
          const isMatch = await bcryptjs.compare(password, loginData.password);
          if (isMatch) {
            let key1 = process.env.ADMIN_ENCRYPTION_KEY;
            let encryptAdmin = encrypt(loginData._id, key1);
            let encryptPass = encrypt(loginData.password, key1);
            let token = jwt.sign(
              { admin_id: encryptAdmin, password: encryptPass },
              process.env.ADMIN_ACCESS_TOKEN,
              { expiresIn: process.env.ADMIN_ACCESS_TIME }
            );
            res({ status: 200, data: token });
          } else {
            rej({ status: 404, message: "something went wrong!!" });
          }
        } else {
          rej({ status: 400, message: "Email or password is incorrect!!" });
        }
      } catch (err) {
        console.log("err ...", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },
  
};
