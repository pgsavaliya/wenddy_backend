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
    address_id: {
      type: String,
    },
    product: [
      {
        product_id: {
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
        description: {
          type: String,
        },
      },
    ],
    payment_data: {
      payments: {
        type: Object,
      },
      payer: {
        type: Object,
      },
    },
  },
  { timestamps: true }
);

module.exports = model("order", orderSchema);
