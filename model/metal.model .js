const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");

const metalSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
    },
    metal_type: {
      type: String,
      require: true,
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
    mrp: {
      type: Number,
      require: true,
    },
    real_price: {
      type: Number,
      require: true,
    },
  },

  { timestamps: true }
);

module.exports = model("metal", metalSchema);
