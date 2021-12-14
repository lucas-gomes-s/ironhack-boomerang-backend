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
            variant: mongoose.Schema.Types.ObjectId, ref: "Variant",
            startDate: {
                type: Date,
                required: true
            },
            endDate: {
                type: Date
            }
        }
    }],
    signature: {
        type: Boolean,
        default: false,
        required: true
    }
}, 
{timestamps: true})

const orderModel = mongoose.model("Order", orderModel)

module.exports = orderModel