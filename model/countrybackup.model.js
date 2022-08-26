const { Schema, model } = require("mongoose");

let countrybackupSchema = new Schema(
  {
    date: {
      type: Date,
    },
    country_data: [
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
          require: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("countrybackup", countrybackupSchema);
