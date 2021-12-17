 const mongoose = require("mongoose")


const storeSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 100
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Category"
    }],
    products: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Store",
        
    }],
    img: {
        type: String,
        default: "https://images2.alphacoders.com/862/thumb-1920-862737.png"
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    offDays: [{
        type: Number
        //1 Sunday, 7 Saturday
    }],
    available: {
        type:Boolean,
        default: true,
        required: true
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Order" 
    }]
})

const storeModel = mongoose.model("Store", storeSchema)

module.exports = storeModel