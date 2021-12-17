const mongoose = require("mongoose")

const productVariantSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: "Product",
        required: true
    },
    specification: {
        type: Object,
        required: true
    },
    active: {
        type:Boolean,
        default: true,
        required: true
    },

    quantity: {
        type: Number,
        default: 0,
        required: true
    },

    unavailable: [{
        type: Date
    }], 

    orders: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Order" 
    }],
    dailyOrders: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        default: {}
    }
}, {minimize: false})

const productVariantModel = mongoose.model("Variant", productVariantSchema)

module.exports = productVariantModel