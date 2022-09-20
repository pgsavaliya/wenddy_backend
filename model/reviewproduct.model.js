const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");

const reviewproductSchema = new Schema(
  {
    product_id: {
      type: Number,
    },
    image: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
      require: true,
    },
    choice: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
    },
    recommend: {
      type: Number,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    adminreplay: {
      type: String,
      require: true,
    },
  },

  { timestamps: true }
);

module.exports = model("reviewproduct", reviewproductSchema);
