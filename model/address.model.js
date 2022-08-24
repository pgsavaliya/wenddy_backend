const { Schema, model } = require("mongoose");

let addressSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        email: {
            type: String,
        },
        mobile: {
            type: Number,
        },
        address: [
            {
                address_name: {
                    type: String,
                },
                house_no: {
                    type: String,
                },
                street_address_1: {
                    type: String,
                },
                street_address_2: {
                    type: String,
                },
                postalcode: {
                    type: Number,
                },
                city: {
                    type: String,
                },
                state: {
                    type: String,
                },
                country: {
                    type: String,
                },
                address_mobile: {
                    type: Number,
                },
                is_primary: {
                    type: Boolean,
                    default: false,
                },
            }
        ],
    },
    { timestamps: true }
);

module.exports = model("address", addressSchema);
