const { Schema, model } = require("mongoose");
const { mongoose } = require("mongoose");

const wishlistSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    product_id: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("wishlist", wishlistSchema);
