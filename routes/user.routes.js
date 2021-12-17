const express = require("express");
const User = require("../models/User.model");


const router = express.Router();

router.post("/", async (req,res) =>{
    try{
        const newUser = await User.create(req.body)
        res.status(201).json(newUser)
    }
    catch(error){
        res.status(400).json(error)
    }
})

router.get("/", async (req,res) =>{
    try{
        let user = []
        if (req.query.firebase) {
            user = await User.find({firebaseId: req.query.firebase})
            console.log(user)
        }

        else {
            user = await User.find({})
        }

        res.status(200).json(user)
    }
    catch(error){
        res.status(400).json(error.message)
    }
})

module.exports = router