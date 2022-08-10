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
    product_amount:{
      type:Number,
    },
    total_price:{
      type:Number,
    },
  },
  { timestamps: true }
);

module.exports = model("addtocart", addtocartSchema);
