const { Schema, model } = require("mongoose");

let supportSchema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: Number,
        },
        message: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = model("support", supportSchema);
