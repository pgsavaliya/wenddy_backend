const { Schema, model } = require("mongoose");

let otpSchema = new Schema(
  {
    email: {
      type: String,
    },
    otp: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("otp", otpSchema);
