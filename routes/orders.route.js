const express = require("express");
const Order = require("../models/Order.model");
const User = require("../models/User.model");
const Category = require("../models/Category.model")
const Product = require("../models/Product.model")
const ProductVariant = require("../models/ProductVariant.model")
const Store = require("../models/Store.model")
const moment = require("moment")


const router = express.Router();


router.post("/test", async (req, res) => {
    try{
        for (let i=0; i<req.body.items.length;i++) {
            let startDate = moment(req.body.items[i].startDate, "YYYY-MM-DD")
            let endDate = moment(req.body.items[i].endDate, "YYYY-MM-DD")
            let variant = await ProductVariant.find({_id: req.body.items[i].variant})
            let calendar = variant[0].dailyOrders
            let date = moment(startDate, "YYYY-MM-DD").format("YYYY-MM-DD")
            for (let j=0; j< endDate.diff(startDate, "days"); j++) {
                if (Object.keys(calendar).includes(date)) {
                    calendar[date] = calendar[date] + 1 
                }
                else {  
                    calendar[date] = 1
                }
                date = moment(date, "YYYY-MM-DD").add(1, "days").format("YYYY-MM-DD")
            }
            await ProductVariant.findOneAndUpdate({_id: req.body.items[i].variant}, {$set: {dailyOrders: calendar}})
            let aux = variant[0].unavailable
            for (let j=0; j<Object.keys(calendar).length; j++) {
                if (calendar[Object.keys(calendar)[j]] >= variant[0].quantity) {
                    aux.push(Object.keys(calendar)[j])
                }
            }
            await ProductVariant.findOneAndUpdate({_id: req.body.items[i].variant}, {$set: {unavailable: aux}})

        }
    res.status(200).json({})
    }
    catch(error) {
        console.log(error.message)
    }
})

router.post("/", async (req, res) => {
    try {
        const newOrder = await Order.create(req.body)
        const updateUser = await User.findOneAndUpdate({_id: req.body.userId}, {$push: {orders: newOrder._id}})
        
        for (let i=0; i<req.body.items.length;i++) {
            let startDate = moment(req.body.items[i].startDate, "YYYY-MM-DD")
            let endDate = moment(req.body.items[i].endDate, "YYYY-MM-DD")
            let variant = await ProductVariant.find({_id: req.body.items[i].variant})
            let calendar = variant[0].dailyOrders
            let date = moment(startDate, "YYYY-MM-DD").format("YYYY-MM-DD")
            for (let j=0; j< endDate.diff(startDate, "days"); j++) {
                if (Object.keys(calendar).includes(date)) {
                    calendar[date] = calendar[date] + 1 
                }
                else {  
                    calendar[date] = 1
                }
                date = moment(date, "YYYY-MM-DD").add(1, "days").format("YYYY-MM-DD")
            }
            await ProductVariant.findOneAndUpdate({_id: req.body.items[i].variant}, {$set: {dailyOrders: calendar}})
            let aux = variant[0].unavailable
            for (let j=0; j<Object.keys(calendar).length; j++) {
                if (calendar[Object.keys(calendar)[j]] >= variant[0].quantity) {
                    aux.push(Object.keys(calendar)[j])
                }
            }
            await ProductVariant.findOneAndUpdate({_id: req.body.items[i].variant}, {$set: {unavailable: aux}})
        }
        
        
        for (let i=0; i<newOrder.items.length; i++) {
            const updateProduct = Product.findOneAndUpdate({_id: newOrder.items[i].product}, {$push: {orders: newOrder._id}})
            const updateStore= Store.findOneAndUpdate({_id: newOrder.items[i].store}, {$push: {orders: newOrder._id}})
            const updateVariant= ProductVariant.findOneAndUpdate({_id: newOrder.items[i].variant}, {$push: {orders: newOrder._id}}).populate("orders")
        }
    
        res.status(201).json(newOrder)
    }
    catch(error) {
        res.status(400).json(error.message)
    }
})

router.delete("/:id", async (req, res) => {
    try{
        const order = await Order.find({_id: req.params.id})
        const updateUser = await User.findOneAndUpdate({_id: order[0].userId}, {$pull: {orders: order[0]._id}})
        for (let i=0; i<order[0].items.length; i++) {
            const updateProduct = Product.findOneAndUpdate({_id: order[0].items[i].product}, {$pull: {orders: order[0]._id}})
            const updateVariant= ProductVariant.findOneAndUpdate({_id: order[0].items[i].variant}, {$pull: {orders: order[0]._id}})
            const updateStore= Store.findOneAndUpdate({_id: order[0].items[i].store}, {$pull: {orders: order[0]._id}})

        }
        const deleteOrder = await Order.findOneAndDelete({_id: order[0]._id})

        res.status(200).json({})
    }
    catch(error) {
        res.status(400).json(error.message)
    }
})

module.exports = router