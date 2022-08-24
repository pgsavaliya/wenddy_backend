const { Schema, model } = require("mongoose");
const { mongoose } = require("mongoose");

const addtocartSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    product_id: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
    },
    total_price: {
      type: Number,
    },
    metal: {
      type: String,
    },
    dimand_type: {
      type: String,
    },
    ring_size: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = model("addtocart", addtocartSchema);
