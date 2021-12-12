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
    minPrice: {
        type: Number,
        default: 0,
        required: true
    },
    maxPrice: {
        type: Number
    },
    variants: [{
        type: Object
    }],
    available: {
        type:Boolean,
        default: true,
        required: true
    }
})

const productModel = mongoose.model("Product", productSchema)

module.exports = productModel