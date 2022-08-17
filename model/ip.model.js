const { Schema, model } = require("mongoose");

let ipSchema = new Schema(
  {
    ip_address: String,
  },
  { timestamps: true }
);

module.exports = model("ip", ipSchema);
