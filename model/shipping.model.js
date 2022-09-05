const { Schema, model } = require("mongoose");

let shippingSchema = new Schema(
  {
    profile_name: {
      type: String,
    },
    country: [
      {
        country_name: {
          type: String,
          require: true,
        },
        price: {
          type: Number,
          require: true,
        },
        timming: {
          type: Number,
          require: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("shipping", shippingSchema);
