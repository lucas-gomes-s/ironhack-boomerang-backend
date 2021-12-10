const mongoose = require("mongoose")
const { stringify } = require("nodemon/lib/utils")

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    imgLogo: {
        type: String,
        default: "https://images2.alphacoders.com/862/thumb-1920-862737.png"
    },
    imgDisplay: {
        type: String,
        default: "https://images2.alphacoders.com/862/thumb-1920-862737.png"
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Product"
    }],
    stores: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Store"
    }]
})

const categoryModel = mongoose.model("Category", categorySchema)

module.exports = categoryModel