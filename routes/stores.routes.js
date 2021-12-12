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

module.exports = router