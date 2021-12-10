const mongoose = require("mongoose")
const express = require("express")
const Category = require("../models/Category.model")

const router = express.Router()


router.post("/", async (req, res) => {
    try {
        const newCategory = await Category.create(req.body)
        res.status(200).json(newCategory)
    }
    catch(error) {
        res.status(400).json(error)
    }
})

router.get("/", async (req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json(categories)
    }
    catch(error) {
        res.status(400).json(error)
    }
})

module.exports = router