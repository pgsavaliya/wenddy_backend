const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");

const adminSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

adminSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcryptjs.hash(this.password, 12);
    }
});

module.exports = model("admin", adminSchema);