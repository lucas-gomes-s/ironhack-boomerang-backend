const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    firebaseId: {
        type: String,
        required: true
    },

    billingAddress: {
        name: {
            type: String,
            trim: true,
            maxLength: 100
        },
        address: {
            type: String,
            trim: true,
            maxLength: 500
        },
        zipCode: {
            type: Number,
        }
    },

    shippingAddress: {
        name: {
            type: String,
            trim: true,
            maxLength: 100
        },
        address: {
            type: String,
            trim: true,
            maxLength: 500
        },
        zipCode: {
            type: Number
        }
    },

    orders: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Order"
    }],

    role: [{
        type: String,
        enum: ["client", "admin", "partner"],
        default: "client",
        required: true
    }]
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel