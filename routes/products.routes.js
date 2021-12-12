const express = require("express");
const Product = require("../models/Product.model");
const Category = require("../models/Category.model");
const Store = require("../models/Store.model")

const router = express.Router();

router.post("/", async (req,res) =>{
    try{
        const newProduct = await Product.create(req.body);
        for (let i=0; i<newProduct.categories.length; i++) {
            const category = await(Category.findOneAndUpdate({_id: newProduct.categories[i]}, {$push: {products: newProduct._id}}))
        };       
        for (let i=0; i<newProduct.categories.length; i++) {
            const store = await(Store.findOneAndUpdate({_id: newProduct.stores[i]}, {$push: {products: newProduct._id}}))
        };              
        res.status(201).json(newProduct)
        // Has to also update store and category
    }
    catch(error){
        res.status(400).json(error)
    }
})

router.get("/:_id", async (req, res) => {
    try{
        const product = await Product.find({_id: req.params._id})
        res.status(200).json(product)
    }
    catch(error){
        res.status(400).json(error)
    }
})

module.exports = router