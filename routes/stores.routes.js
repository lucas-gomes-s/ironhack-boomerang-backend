const express = require("express");
const Store = require("../models/Store.model");
const Category = require("../models/Category.model")

const router = express.Router();

router.post("/", async (req,res) =>{
    try{
        const newStore = await Store.create(req.body)
        for (let i=0; i<newStore.categories.length; i++) {
            const category = await(Category.findOneAndUpdate({_id: newStore.categories[i]}, {$push: {stores: newStore._id}}))
        }
        res.status(201).json(newStore)
    }
    catch(error){
        res.status(400).json(error)
    }
})

router.delete("/:id", async (req,res) =>{
    try{
        const store = await Store.find({_id: req.params.id})
        for (let i=0; i<store[0].categories.length; i++) {
            const category = await(Category.findOneAndUpdate({_id: store[0].categories[i]}, {$pull: {stores: store[0]._id}}))
        }
        const deletedStore = await Store.findOneAndDelete({_id: req.params.id})
        res.status(200).json({})
    }
    catch(error){
        res.status(400).json(error.message)
    }
})


router.get("/", async (req,res) =>{
    try{
        const stores = await Store.find({})
        res.status(200).json(stores)
    }
    catch(error){
        res.status(400).json(error)
    }
})

module.exports = router