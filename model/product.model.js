const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");

const productSchema = new Schema(
  {
    // product_images: [
    //   {
    //     unique_img: {
    //       type: String,
    //     },
    //     original: {
    //       type: String,
    //     },
    //     original_url: {
    //       type: String,
    //     },
    //     reduce: {
    //       type: String,
    //     },
    //     reduce_url: {
    //       type: String,
    //     },
    //     medium: {
    //       type: String,
    //     },
    //     medium_url: {
    //       type: String,
    //     },
    //     is_primary: {
    //       type: Boolean,
    //       default: false,
    //     },
    //     small: {
    //       type: String,
    //     },
    //     small_url: {
    //       type: String,
    //     },
    //   },
    // ],
    image: [
      {
        type: String,
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
      default: 0,
    },
    mrp: {
      type: Number,
      default: 0,
    },
    percentage_difference: {
      type: String,
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
        metal: {
          type: String,
        },
        diamond_type: {
          type: String,
        },
        sku: {
          type: String,
          //required: true,
        },
        qty: {
          type: Number,
          //required: true,
        },
        real_price: {
          type: Number,
        },
        mrp: {
          type: Number,
        },
        percentage_difference: {
          type: String,
        },
        is_visible: {
          type: Boolean,
          //required: true,
          default: true,
        },
        // unique_img: {
        //   type: String,
        // },
        // variations: [
        //   {
        //     variation_id: {
        //       type: Schema.Types.ObjectId,
        //       ref: "variation",
        //     },
        //     variation_name: {
        //       type: String,
        //     },
        //     variation_value: {
        //       type: String,
        //     },
        //   },
        // ],
      },
    ],
    admin_id: {
      type: Schema.Types.ObjectId,
      //required: true,
      ref: "vendor",
    },
    // category: {
    //   type: String,
    // },
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
    total_view: {
      type: Number,
      default: 0,
    },
    total_sale: {
      type: Number,
      default: 0,
    },
    video_url: {
      type: String,
      //required: true,
    },
    tag: [
      {
        type: String,
        require: true,
      },
    ],
    category: [
      {
        type: String,
      },
    ],
    ring_type: [
      {
        type: String,
      },
    ],
    diamond_shape: [
      {
        type: String,
      },
    ],
    ring_size: [
      {
        type: Number,
      },
    ],
    offerImage: {
      type: String,
    },
    is_fav: {
      type: Boolean,
      default: false,
    },
    uniqueCode: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = model("product", productSchema);
