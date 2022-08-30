const { Schema, model } = require("mongoose");

let subscribeSchema = new Schema(
  {
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
  },
  { timestamps: true }
);

module.exports = model("subscribe", subscribeSchema);
