const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { encrypt } = require("../../helper/encrypt-decrypt");
const userModel = require("../../model/user.model");

module.exports = {
  register: (data) => {
    return new Promise(async (res, rej) => {
      try {
        let newUserModel = new userModel(data);
        let saveData = await newUserModel.save();
        if (saveData) {
          res({ status: 200, data: "User Registered Successfully!!" });
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
        let loginData = await userModel.findOne({ email });
        // console.log("loginData ......", loginData);
        if (loginData) {
          // console.log(loginData.user_status);
          if (loginData.user_status == true) {
            const isMatch = await bcryptjs.compare(
              password,
              loginData.password
            );
            if (isMatch) {
              let key1 = process.env.USER_ENCRYPTION_KEY;
              let encryptUser = encrypt(loginData._id, key1);
              let encryptPass = encrypt(loginData.password, key1);
              let encryptEmail = encrypt(loginData.email, key1);
              console.log(encryptEmail);
              let token = jwt.sign(
                {
                  user_id: encryptUser,
                  password: encryptPass,
                  email: encryptEmail,
                },
                process.env.USER_ACCESS_TOKEN,
                { expiresIn: process.env.USER_ACCESS_TIME }
              );
              res({ status: 200, data: token });
            } else {
              rej({
                status: 404,
                message: "Email or password is incorrect!!",
              });
            }
          } else {
            rej({
              status: 404,
              message: "This user is blocked,contect admin!!",
            });
          }
        } else {
          rej({
            status: 404,
            message: "Email or password is incorrect!!",
          });
        }
      } catch (err) {
        console.log("err ...", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },
};
