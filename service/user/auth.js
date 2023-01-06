const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { encrypt, decrypt } = require("../../helper/encrypt-decrypt");
const userModel = require("../../model/user.model");
const { mail } = require("../../helper/mail");
const addtocartService = require("./cart");
const wishlistService = require("./wishlist");

module.exports = {
  register: (data) => {
    return new Promise(async (res, rej) => {
      try {
        let newUserModel = new userModel(data);
        let saveData = await newUserModel.save();
        if (saveData) {
          let key1 = process.env.USER_ENCRYPTION_KEY;
          let encryptUser = encrypt(saveData._id, key1);
          let encryptPass = encrypt(saveData.password, key1);
          let encryptEmail = encrypt(saveData.email, key1);
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
          // res({ status: 200, data: "User Registered Successfully!!" });
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

  login: (email, password, data1) => {
    return new Promise(async (res, rej) => {
      try {
        let loginData = await userModel.findOne({ email });
        // console.log("loginData ......", loginData);
        if (loginData) {
          console.log(loginData._id);
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
              let data = {
                token: token,
                first_name: loginData.first_name,
                last_name: loginData.last_name,
              };
              for (i = 0; i < data1.cartData.length; i++) {
                if (data1.cartData[i]) {
                  let addCart = await addtocartService.addtocart(
                    loginData._id,
                    data1.cartData[i]
                  );
                  if (addCart) {
                    console.log("cartAdded");
                  }
                }
              }

              for (i = 0; i < data1.wishlistData.product_id.length; i++) {
                if (data1.wishlistData.product_id[i]) {
                  let addwishlist = await wishlistService.addwishlist(
                    loginData._id,
                    { product_id: data1.wishlistData.product_id[i] }
                  );
                  if (addwishlist) {
                    console.log("wishlist Added");
                  }
                }
              }

              res({ status: 200, data: data });
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

  forgot: (email) => {
    return new Promise(async (res, rej) => {
      try {
        let Data = await userModel.findOne({ email });
        if (Data) {
          if (Data.user_status == true) {
            let key1 = process.env.USER_ENCRYPTION_KEY;
            let encryptUser = encrypt(Data._id, key1);
            let encryptEmail = encrypt(Data.email, key1);
            let token = jwt.sign(
              {
                user_id: encryptUser,
                email: encryptEmail,
              },
              process.env.USER_ACCESS_TOKEN,
              { expiresIn: process.env.USER_ACCESS_TIME }
            );
            let abc =
              "<a href='http://localhost:3000/forgot-password?token=" +
              token +
              "'>Click Here</a>";
            console.log(email);
            await mail(email, "this is a sample mail", abc)
              .then((data) => {
                let data1 = "mail send";
                res({ status: 200, data: data1 });
              })
              .catch((err) => {
                rej({ status: 500, data: "something went worng" });
                console.log("err ...", err);
              });
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

  changepss: async (data, email) => {
    return new Promise(async (res, rej) => {
      try {
        if (email == data.email) {
          let cpassword = data.comfirmpassword;
          if (data.password == cpassword) {
            let getData1 = await userModel.findOne({ email: data.email });
            if (getData1) {
              let encryptPassword = await bcryptjs.hash(data.password, 12);
              let password = { password: encryptPassword };
              console.log("password.. ", password);
              let getData = await userModel.updateOne(
                { email: data.email },
                password
              );
              if (getData) {
                res({ status: 200, data: "password update sycessfully" });
              } else {
                rej({ status: 404, message: "Something went worng" });
              }
            }
          } else {
            rej({
              status: 404,
              error: "password and confirm password not match",
              message: "something went wrong!!",
            });
          }
        } else {
          rej({
            status: 404,
            error: "This email id is not match please enter right email",
            message: "something went wrong!!",
          });
        }
      } catch (err) {
        console.log("err", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },
};
