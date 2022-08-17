const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const http = require("https");
const path = require("path");
const otpModel = require("../model/otp");
require("dotenv").config({ path: path.join(__dirname, "./config/.env") });

module.exports = {
  sendOtp: (email) => {
    return new Promise(async (res, rej) => {
      try {
        let otp = Math.floor(100000 + Math.random() * 900000);
        // List of variable with the same name defind in msg sendOtp API

        var transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: "b10ehospital@gmail.com",
            pass: "Pavan@123",
          },
        });

        var mailOptions = {
          from: "b10ehospital@gmail.com",
          to: "pavan8866116973@gmail.com",
          subject: "Sending Email about OTP",
          text: otp,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        // const params =
        if (transporter) {
          var newOtpModel = new otpModel({
            mobile: params.mobile,
            otp: params.otp,
          });
          let saveData = await newOtpModel.save();
          setTimeout(async () => {
            let deletedotp = await otpModel.findOneAndDelete({
              otp: params.otp,
            });
          }, 5 * 60 * 1000);
          if (saveData) {
            res({ status: 200, data: {} });
          } else {
            rej({ status: 500, message: "something went wrong!!" });
          }
        }
      } catch (err) {
        // console.log("error ...", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

  verifyOtp: (email, otp) => {
    return new Promise(async (res, rej) => {
      try {
        let getData;

        getData = await otpModel.findOneAndDelete({ email, otp });
        if (getData) {
          let token = jwt.sign({ email }, process.env.USER_OTP_TOKEN, {
            expiresIn: process.env.USER_OTP_ACCESS_TIME,
          });
          res({ status: 200, token: token });
        } else {
          rej({ status: 404, message: "Invalid Otp!!" });
        }
      } catch (err) {
        // console.log("error ...", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },
};
