const mongoose = require("mongoose")


const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true
    },
    shippingCost: {
        type: Number,
        default: 0
    },
    itemsCost : {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    totalCost: {
        type: Number,
        default: 0
    },
    items: [{
            product: {
                type: mongoose.Schema.Types.ObjectId, ref: "Product",
                required: true
            },
            variant: {
                type: mongoose.Schema.Types.ObjectId, ref: "Variant",
                required: true
            },
            store:{
                type: mongoose.Schema.Types.ObjectId, ref: "Store",
                required: true
            },
            startDate: {
                type: Date,
                required: true
            },
            endDate: {
                type: Date
            }
    }],
    signature: {
        type: Boolean,
        default: false,
        required: true
    },
    status: {
        type: String,
        enum: ["created", "accepted", "ready for delivery", "delivered", "finished", "cancelled"],
        required: true,
        default: "created"
    }
}, 
{timestamps: true})

const orderModel = mongoose.model("Order", orderSchema)

module.exports = orderModel