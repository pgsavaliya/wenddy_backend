const { Schema, model } = require("mongoose");
const { mongoose } = require("mongoose");

const addtocartSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    product: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
        },
        quantity: {
          type: Number,
          require: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("addtocart", addtocartSchema);
