const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");

const reviewproductSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
    },
    images: [
      {
        unique_img: {
          type: String,
        },
        original: {
          type: String,
        },
        original_url: {
          type: String,
        },
        reduce: {
          type: String,
        },
        reduce_url: {
          type: String,
        },
        medium: {
          type: String,
        },
        medium_url: {
          type: String,
        },
        is_primary: {
          type: Boolean,
          default: false,
        },
        small: {
          type: String,
        },
        small_url: {
          type: String,
        },
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
  },

  { timestamps: true }
);

module.exports = model("reviewproduct", reviewproductSchema);
