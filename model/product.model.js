const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");

const productSchema = new Schema(
  {
    product_images: [
      {
        uniqueImg: {
          type: String,
        },
        original: {
          type: String,
        },
        originalURL: {
          type: String,
        },
        reduce: {
          type: String,
        },
        reduceURL: {
          type: String,
        },
        medium: {
          type: String,
        },
        mediumURL: {
          type: String,
        },
        is_primary: {
          type: Boolean,
          default: false,
        },
        small: {
          type: String,
        },
        smallURL: {
          type: String,
        },
      },
    ],
    product_title: {
      type: String,
    },
    product_description: {
      type: String,
    },
    real_price: {
      type: Number,
    },
    mrp: {
      type: Number,
    },
    sku: {
      type: String,
    },
    qty: {
      type: Number,
    },
    product_type: {
      type: String,
      enum: ["simple", "variation"],
    },
    product_variation: [
      {
        sku: {
          type: String,
          required: true,
        },
        variations: [
          {
            variation_id: {
              type: Schema.Types.ObjectId,
              ref: "variation",
            },
            variation_name: {
              type: String,
            },
            variation_value: {
              type: String,
            },
          },
        ],
        qty: {
          type: Number,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
        uniqueImg: {
          type: String,
        },
        is_visible: {
          type: Boolean,
          required: true,
          default: true,
        },
      },
    ],
    admin_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "vendor",
    },
    category: {
      type: String,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    subCategory_id: {
      type: Schema.Types.ObjectId,
    },
    subCategory: {
      type: String,
    },
    listing_status: {
      type: String,
      enum: ["active", "deactive", "block", "delete", "sold_out", "stock_out"],
      default: "active",
    },
    is_public: {
      type: Boolean,
      default: true,
    },
    totalview: {
      type: Number,
      default: 0,
    },
    totalsale: {
      type: Number,
      default: 0,
    },
    videourl: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = model("product", productSchema);
