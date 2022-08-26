const { Schema, model } = require("mongoose");

let countrySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    currency: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = model("country", countrySchema);
