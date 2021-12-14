const express = require("express");
const Product = require("../models/Product.model");
const Category = require("../models/Category.model");
const Store = require("../models/Store.model")
const Variant = require("../models/ProductVariant.model");
const axios = require ("axios");

const router = express.Router();

router.post("/", async (req,res) =>{
    try{
        const newProduct = await Product.create(req.body);
        for (let i=0; i<newProduct.categories.length; i++) {
            const category = await Category.findOneAndUpdate({_id: newProduct.categories[i]}, {$push: {products: newProduct._id}})
        };       
        for (let i=0; i<newProduct.categories.length; i++) {
            const store = await Store.findOneAndUpdate({_id: newProduct.stores[i]}, {$push: {products: newProduct._id}})
        };              
        res.status(201).json(newProduct)
        // Has to also update store and category
    }
    catch(error){
        res.status(400).json(error)
    }
})

router.post("/variant", async (req,res) => {
    try{
        const newVariant = await Variant.create(req.body)
        const updatedProduct = await Product.findOneAndUpdate(
            {_id: newVariant.product},
            {$push: {variants: newVariant._id}}
        )
        res.status(201).json(newVariant)
    }
    catch(error) {
        res.status(400).json(error)
    }
})

router.delete("/:_id", async (req,res) => {
    try{
        const product = await Product.find({_id: req.params._id})
        console.log(product[0].categories.length)
        for (let i=0; i<product[0].categories.length; i++) {
            const category = await Category.findOneAndUpdate({_id: product[0].categories[i]}, {$pull: {products: product[0]._id}})
        };       
        for (let i=0; i<product[0].stores.length; i++) {
            const store = await Store.findOneAndUpdate({_id: product[0].stores[i]}, {$pull: {products: product[0]._id}})
            console.log(store)
        };   
        for (let i=0; i<product[0].variants.length; i++) {
            const store = await Variant.findOneAndDelete({_id: product[0].variants[i]})
        };            
        const deletedProduct = await Product.findOneAndDelete({_id: req.params._id})
        res.status(200).json({})

    }
    catch(error) {
        res.status(400).json(error.message)
    }
})
router.get("/:_id", async (req, res) => {
    try{
        const product = await Product.find({_id: req.params._id}).populate("variants").populate("stores")
        res.status(200).json(product)
    }
    catch(error){
        res.status(400).json(error)
    }
})

router.post("/freight", async(req,res) => {
    axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${req.body.origin}&destination=${req.body.destination}&key=${process.env.GOOGLE_API_KEY}`)
    .then (response => 
        res.status(200).json(response.data)
    )
    .catch (error => {
        res.status(400).json(error)
    }
    )
})

module.exports = router