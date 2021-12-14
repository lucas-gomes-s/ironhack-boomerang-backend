const mongoose = require("mongoose")


const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Category"
    }],
    stores: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Store",
        
    }],
    img: {
        type: String,
        default: "https://images2.alphacoders.com/862/thumb-1920-862737.png"
    },
    secondaryImgs: {
        type: String,
    },
    variants: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Variant",
    }],
    //variantTypes: [{
      //  type: Object
    //}],
    pricingType: {
        type: String,
        enum: ["daily", "period"],
        default: "daily",
        required: true
    },
    pricing: [{
        Type: mongoose.Schema.Types.Mixed,
    }],
    active: {
        type:Boolean,
        default: true,
        required: true
    },
    unavailable: [{
        type: Date
    }],
    signature: {
        type: Boolean,
        default: false,
        required: true
    }
})

const productModel = mongoose.model("Product", productSchema)

module.exports = productModel