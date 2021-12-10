const mongoose = require("mongoose")



const connectToDb = 
    mongoose.connect(process.env.DB_URI)
    .then (response => {
       return console.log(`Connected to DB`)
    })
    .catch(error => {return console.log(error)})



module.exports = connectToDb