const mongoose = require("mongoose")

const productVariantSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: "Product"
    },
    variant: {
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
    }]
})

const productVariantModel = mongoose.model("Variant", productVariantSchema)

module.exports = productVariantModel