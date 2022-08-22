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
    payment_status: {
      type: Boolean,
      default: false,
    },
    payerId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    address: {
      type: String,
    },
    product: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
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
        description: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("order", orderSchema);
