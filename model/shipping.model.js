const { Schema, model } = require("mongoose");

let shippingSchema = new Schema(
  {
    profile_name: {
      type: String,
    },
    country: [
      {
        name: {
          type: String,
          require: true,
        },
        price: {
          type: Number,
          require: true,
        },
        start: {
          type: Number,
          require: true,
        },
        end: {
          type: Number,
          require: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("shipping", shippingSchema);
