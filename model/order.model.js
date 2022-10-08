const { Schema, model } = require("mongoose");
const { mongoose } = require("mongoose");

const orderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    total: {
      type: Number,
    },
    address: {},
    product: [
      {
        product_id: {
          type: Number,
          require: true,
        },
        price: {
          type: Number,
          require: true,
        },
        quantity: {
          type: Number,
          require: true,
        },
        product_amount: {
          type: Number,
        },
        total_price: {
          type: Number,
        },
        ring_size: {
          type: Number,
        },
        description: {
          type: String,
        },
        cart_id: {
          type: Schema.Types.ObjectId,
          ref: "cart",
        },
        product_title: {
          type: String,
        },
        product_image: {
          type: String,
        },
      },
    ],
    payment_data: {
      payment_id: {
        type: String,
      },
      payments: {
        type: Object,
      },
      payer: {
        type: Object,
      },
    },
    status: {
      type: String,
      default: "pending",
    },
    is_cancel: {
      type: String,
      default: "false",
    },
  },

  { timestamps: true }
);

module.exports = model("order", orderSchema);
